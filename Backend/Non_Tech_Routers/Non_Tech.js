const express = require('express');
const router = express.Router();
const { IPLS, ESPORTS, GoogleS,StoryS } = require('../Non_Tech_models/Non_Tech');
require('dotenv').config();


// Route to add a new IPL document and create Razorpay order
router.post('/ipl', async (req, res) => {
  try {
   
    const newData = new IPLS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College
    });

    const newPost = await newData.save();
    res.json(newPost)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Repeat for ESPORTS and GoogleS routes

router.post('/esports', async (req, res) => {
  try {
    
    const newData = new ESPORTS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College // Save the order ID with the document
    });

    const newPost = await newData.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/story', async (req, res) => {
  try {
   

    const newData = new StoryS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/google', async (req, res) => {
  try {

    const newData = new GoogleS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
