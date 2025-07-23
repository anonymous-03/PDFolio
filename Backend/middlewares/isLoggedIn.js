const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not logged In' });  
    }
    next();
};

export default isLoggedIn;
