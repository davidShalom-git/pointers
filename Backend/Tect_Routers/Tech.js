const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const { PPTS, WebS, CodingS,QuizS } = require('../Tech_models/Tech');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id:"rzp_live_LODynINQB1J1t5" ,
  key_secret: "EGxyQP6w3T0cv4p8d6II7Yzy"
});

// Utility function to create Razorpay order
async function createRazorpayOrder() {
  const options = {
    amount: 1000, // Amount in paise (₹50)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };
  return razorpay.orders.create(options);
}

// Route to add a new document and create Razorpay order
async function createOrderAndDocument(req, res, Model) {
  try {
    const order = await createRazorpayOrder();

    const newData = new Model({
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
}

// Routes for creating documents and orders
router.post('/ppt', async (req, res) => {
  await createOrderAndDocument(req, res, PPTS);
});

router.post('/web', async (req, res) => {
  await createOrderAndDocument(req, res, WebS);
});

router.post('/code', async (req, res) => {
  await createOrderAndDocument(req, res, CodingS);
});
router.post('/quiz', async (req, res) => {
  await createOrderAndDocument(req, res, QuizS);
});

// Razorpay payment verification route
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', "EGxyQP6w3T0cv4p8d6II7Yzy")
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment status for each collection
      const collections = [PPTS, WebS, CodingS,QuizS];
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
