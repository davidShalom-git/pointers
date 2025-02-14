const express = require('express');
const router = express.Router();
const { IPLS, ESPORTS, GoogleS, StoryS } = require('../Non_Tech_models/Non_Tech');
const nodemailer = require('nodemailer');

// List of all schemas to check
const allSchemas = [IPLS, ESPORTS, GoogleS, StoryS];

// Function to send email
const sendEmail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "davidshalomswe@gmail.com",
        pass: "qvmc uzfp dwyx rbuu" // Your App Password
      }
    });

    let mailOptions = {
      from: "davidshalomswe@gmail.com",
      to: email,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Common function to handle user registration
const registerUser = async (Model, req, res, subject, text) => {
  try {
    const { Email } = req.body;

    // Check if user exists in any schema
    for (let schema of allSchemas) {
      const existingUser = await schema.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ message: "User already registered in another event." });
      }
    }

    // If user is not found, register them
    const newData = new Model({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College
    });

    // Save to database
    const newPost = await newData.save();

    // Send confirmation email
    await sendEmail(req.body.Email, subject, text);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Routes
router.post('/ipl', (req, res) => {
  registerUser(IPLS, req, res, "IPL Registration", 
    "Thank you for registering for IPL Auction! Your payment and registration are confirmed.");
});

router.post('/esports', (req, res) => {
  registerUser(ESPORTS, req, res, "E-Sports Registration", 
    "Thank you for registering for E-Sports! Your payment and registration are confirmed.");
});

router.post('/story', (req, res) => {
  registerUser(StoryS, req, res, "Story Registration", 
    "Thank you for registering for Story Event! Your payment and registration are confirmed.");
});

router.post('/google', (req, res) => {
  registerUser(GoogleS, req, res, "Geo-Hunters Registration", 
    "Thank you for registering for Geo-Hunters Event! Your payment and registration are confirmed.");
});

module.exports = router;
