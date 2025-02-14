const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { IPLS, ESPORTS, GoogleS, StoryS } = require('../Non_Tech_models/Non_Tech');

// Combine all non-technical event schemas
const nonTechSchemas = [IPLS, ESPORTS, GoogleS, StoryS];

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davidshalomswe@gmail.com',
    pass: 'qvmcuzfpdwyxrbuu' // App Password (Ensure Security)
  }
});

// Function to send an email
const sendMail = (recipient, subject, message) => {
  const mailOptions = {
    from: 'davidshalomswe@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  return transporter.sendMail(mailOptions);
};

// Function to handle registration
const registerForEvent = async (Model, req, res, subject, message) => {
  try {
    const { Email } = req.body;

    // Check if the user is already registered in any non-technical event
    for (let schema of nonTechSchemas) {
      const existingUser = await schema.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ message: "You have already registered for a non-technical event." });
      }
    }

    // Register the user for this event
    const newData = new Model(req.body);
    await newData.save();

    // Send confirmation email
    await sendMail(Email, subject, message);

    res.status(200).json({ message: "Registration successful! Confirmation email sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Non-technical event routes
router.post('/ipl', (req, res) => registerForEvent(IPLS, req, res, "IPL Registration", "Thank you for registering for IPL Auction!"));
router.post('/esports', (req, res) => registerForEvent(ESPORTS, req, res, "E-Sports Registration", "Thank you for registering for E-Sports!"));
router.post('/story', (req, res) => registerForEvent(StoryS, req, res, "Story Registration", "Thank you for registering for Story Event!"));
router.post('/google', (req, res) => registerForEvent(GoogleS, req, res, "Geo-Hunters Registration", "Thank you for registering for Geo-Hunters Event!"));

module.exports = router;
