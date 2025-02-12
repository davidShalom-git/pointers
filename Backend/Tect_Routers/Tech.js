const express = require('express');
const router = express.Router();
const { PPTS, WebS, CodingS, QuizS } = require('../Tech_models/Tech');
require('dotenv').config();

// Route to add a new document without payment integration
async function createDocument(req, res, Model) {
  try {
    const newData = new Model({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College // Assuming payment is not required
    });

    const newPost = await newData.save();
    res.status(201).json({ success: true, newPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Routes for creating documents
router.post('/ppt', async (req, res) => {
  await createDocument(req, res, PPTS);
});

router.post('/web', async (req, res) => {
  await createDocument(req, res, WebS);
});

router.post('/code', async (req, res) => {
  await createDocument(req, res, CodingS);
});

router.post('/quiz', async (req, res) => {
  await createDocument(req, res, QuizS);
});

module.exports = router;
