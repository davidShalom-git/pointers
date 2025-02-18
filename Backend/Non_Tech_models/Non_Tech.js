const mongoose = require('mongoose');

// Define a base schema for consistency
const commonSchema = {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    Accommodation: { 
        type: String, 
        enum: ['With Accommodation', 'Without Accommodation'], 
        required: true 
    }, // Single field for radio button selection
};

// Define the schema for IPL
const IPL = new mongoose.Schema(commonSchema);

// Define the schema for E-Sports
const E_Sports = new mongoose.Schema(commonSchema);

// Define the schema for GoogleMap
const GoogleMap = new mongoose.Schema(commonSchema);

// Define the schema for Story
const Story = new mongoose.Schema(commonSchema);

// Check if models already exist before defining them
const IPLS = mongoose.models.IPLS || mongoose.model('IPLS', IPL);
const ESPORTS = mongoose.models.ESPORTS || mongoose.model('ESPORTS', E_Sports);
const GoogleS = mongoose.models.GoogleS || mongoose.model('GoogleS', GoogleMap);
const StoryS = mongoose.models.StoryS || mongoose.model('StoryS', Story);

// Export models
module.exports = { IPLS, ESPORTS, GoogleS, StoryS };
