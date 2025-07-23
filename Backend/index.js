import express from 'express';
const app = express();
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/user.js'
import Credentials from './models/credential.js';
import session from 'express-session';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
import pdf from 'pdf-parse';
import generateContent from './geminiConfig.js';
import Portfolio from './models/portfolio.js';
import isLoggedIn from './middlewares/isLoggedIn.js';
const port = 5000;
import asyncWrap from './middlewares/asyncWrap.js';
import ExpressError from './middlewares/ExpressError.js';
import MongoStore from 'connect-mongo';

app.set('trust proxy', 1);

const corsOptions = {
    origin: process.env.REACT_APP_URL, 
    credentials: true, 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname,"public")));

const MONGO_URL=process.env.ATLAS_DB_URL;

const store=MongoStore.create({
    mongoUrl:MONGO_URL,
    touchAfter:24*3600,
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60,
    crypto:{
        secret:"HelloWorld"
    }
})
const sessionObject = {
    secret: 'Mycatibdcbkjdsvjhsbdcjsdvjhsbvjhsbdvjkhsbdv',
    resave: false,
    saveUninitialized: false,
    store:store,
    cookie: {
        secure: false,
        sameSite: 'none',
        maxAge: 7*24 * 60 * 60 * 1000
    }
}
app.use(session(sessionObject));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, { id: user._id, name: user.name });
        } else {
            done(new Error('User not found'));
        }
    } catch (err) {
        done(err);
    }
});
main().then(res => {
    console.log("Connection successful");
}).catch(err => {
    console.log("Error in connection");
    // console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_APP_URL}/oauth2/redirect/google`,
    scope: ['profile', 'email'],
    state: true
},
    async function verify(accessToken, refreshToken, profile, cb) {

        try {
            //  Check if account exists in out database
            const cred = await Credentials.findOne({
                provider: 'https://accounts.google.com',
                subject: profile.id
            })
            // console.log(profile);
            // console.log(cred);
            if (!cred) {
                // Naya account hai;
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value
                })

                const newCred = await Credentials.create({
                    user_id: newUser._id,
                    provider: 'https://accounts.google.com',
                    subject: profile.id,
                })

                const user = {
                    id: newUser._id,
                    name: newUser.name,
                }
                return cb(null, user);
            } else {
                const user = await User.findById(cred.user_id);
                if (!user) {
                    return cb(null, false);
                }
                const userObject = {
                    id: user._id,
                    name: user.name
                }

                return cb(null, userObject);
            }
        } catch (err) {
            return cb(err);
        }
    }
));

app.get("/",(req,res)=>{
    res.send('Hii');
})
app.get('/auth/login/google', passport.authenticate('google'));

app.get('/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect(`${process.env.REACT_APP_URL}/auth/callback?token=${req.user.id}`);
    });

app.get('/api/auth/logout',isLoggedIn, asyncWrap(async(req, res, next) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.status(200).json({ message: 'Logout successful' });
  });
}));

app.get("/api/auth/me",isLoggedIn, asyncWrap(async (req, res) => {
    if (!req.session.passport) {
        return res.status(401).json({ 'message': 'Not logged In' })
    }
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(401).json({ 'error': 'user not found' });
    }

    return res.status(200).json({ "success": true, 'user': user });
}));

app.post("/api/upload-resume",isLoggedIn, upload.single('resume'), asyncWrap(async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        // Teen step hai- (aaraam se socho)
        // 1. pehle pdf ko parse kr lete hai buffer memory se
        const pdfData = await pdf(req.file.buffer);
        const pdfText = pdfData.text;

        // 2. ab gemini api ko data bhejnaa hai taaki proper json format me wapis de de
        const resumeData = await generateContent(pdfText);

        // 3. Wo data ab MongoB ke user ke resume me save krna hai.....cloudinary wala part cancel kr diyaa hu
        const userID = req.session.passport.user;
        const user = await User.findById(userID);
        user.resume = resumeData;

        await user.save();

        // return res.status(200).json({ 'resume': 'data saved successfully' });
        res.send(resumeData);
    } catch (err) {
        return res.send(err);
    }



}))
// Use POST for creating resources, not GET
app.post("/api/portfolio/:template_name/:id",isLoggedIn,asyncWrap( async (req, res) => {
    try {
        const { template_name, id } = req.params;

        // Use findById to get a single user document
        const user = await User.findById(id);

        console.log(user);

        // Always check if the user was found before proceeding
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const title = `${template_name}_${user.name}`;

        const portfolio = await Portfolio.create({
            id: id,
            title: title,
            template: template_name
        });

        res.status(201).json({
            message: 'Portfolio Creation Successful',
            portfolio: portfolio
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.get("/api/resume-data/:id", asyncWrap(async (req, res) => {

    try {
        const userId = req.params.id;
        // console.log(userId);
        const user = await User.findById(userId);
        // console.log(user);
        if (!user) {
            return res.status(403).json({ 'message': 'user not found' });
        }
        return res.status(200).json(user.resume);
    } catch (err) {
        return res.send(err);
    }
}));

app.get("/api/portfolios",isLoggedIn,asyncWrap( async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Please log in.' });
    }

    const userId = req.user.id; 
    console.log(req.user.id);
    const portfolios = await Portfolio.find({ id: userId });
    console.log(portfolios);
    return res.status(200).json(portfolios);

  } catch (err) {
    console.error("Failed to fetch portfolios:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

app.use((err,req,res,next)=>{
    if (res.headersSent) {
        return next(err); 
    }else{
    let {status, message}=err;
    // req.flash("failure",message);
    res.status(400).json(message);
}
    
})
app.listen(port, () => {
    console.log("Listening on port ");
    console.log(port);
})