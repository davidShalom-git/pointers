const mongoose = require('mongoose');

// Define the schema for IPL
const IPL = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    // Add order_id to all schemas for consistency
});

// Define the schema for E-Sports
const E_Sports = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    
});

// Define the schema for GoogleMap
const GoogleMap = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    
});

// Define the schema for Story
const Story = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    
});

// Check if models already exist before defining them
const IPLS = mongoose.models.IPLS || mongoose.model('IPLS', IPL);
const ESPORTS = mongoose.models.ESPORTS || mongoose.model('ESPORTS', E_Sports);
const GoogleS = mongoose.models.GoogleS || mongoose.model('GoogleS', GoogleMap);
const StoryS = mongoose.models.StoryS || mongoose.model('StoryS', Story);

// Export models
module.exports = { IPLS, ESPORTS, GoogleS, StoryS };
