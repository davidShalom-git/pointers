const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const { IPLS, ESPORTS, GoogleS,StoryS } = require('../Non_Tech_models/Non_Tech');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: "rzp_test_wRMetr8JdWmUxd",
  key_secret: "j9n9fV23OKQYDbrJkOu8ZGkY"
});

// Route to add a new IPL document and create Razorpay order
router.post('/ipl', async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (₹50)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    const newData = new IPLS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      Has_Paid: false,
      order_id: order.id // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json({
      success: true,
      newPost,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Repeat for ESPORTS and GoogleS routes

router.post('/esports', async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (₹50)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    const newData = new ESPORTS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      Has_Paid: false,
      order_id: order.id // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json({
      success: true,
      newPost,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/story', async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (₹50)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    const newData = new StoryS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      Has_Paid: false,
      order_id: order.id // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json({
      success: true,
      newPost,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/google', async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (₹50)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    const newData = new GoogleS({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      Has_Paid: false,
      order_id: order.id // Save the order ID with the document
    });

    const newPost = await newData.save();

    res.status(201).json({
      success: true,
      newPost,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Razorpay payment verification route
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', "j9n9fV23OKQYDbrJkOu8ZGkY")
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment status for each collection
      const collections = [IPLS, ESPORTS, GoogleS,StoryS];
      let documentFound = false;

      for (const Collection of collections) {
        const document = await Collection.findOne({ order_id: razorpay_order_id });
        if (document) {
          document.Has_Paid = true;
          await document.save();
          documentFound = true;
          break;
        }
      }

      if (!documentFound) {
        return res.status(404).json({ success: false, message: "Document not found" });
      }

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
});

module.exports = router;
