import mongoose from "mongoose";

const { Schema } = mongoose;

// Sub-schema for individual projects
const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }]
});

// Sub-schema for professional experience
const ExperienceSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date }, // Can be null for current job
    description: [{ type: String }]
});

// The complete ResumeSchema, matching your JSON structure
const ResumeSchema = new Schema({
    personalInfo: {
        name: String,
        title: String,
        location: String
    },
    landing: { // Restored this field
        headline: String,
        subheadline: String
    },
    summary: {
        content: String,
        highlights: [String],
        yearsExperience: Number, // Restored this field
        specialization: String   // Restored this field
    },
    skills: {
        technical: [String],
        tools: [String],
        soft: [String]
    },
    projects: [ProjectSchema],
    experience: [ExperienceSchema], // Restored this field
    achievements: [String],
    contact: {
        email: String,
        phone: String
    },
    footer: {
        socials: {
            linkedin: String,
            github: String
        }
    }
}, { _id: false }); // Prevents creating a separate _id for the subdocument


// Main UserSchema with the correctly embedded ResumeSchema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    resume: {
        type: ResumeSchema // Embeds the complete resume structure
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;