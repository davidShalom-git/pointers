const mongoose = require('mongoose')


const PPT = mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Email: {
        type:String,
        required: true
    },
    Phone_No: {
        type:String,
        required: true
    },
    Has_Paid: {
        type:String,
        required: true
    },
    order_id: {
        type: String
    }
})
const Web = mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Email: {
        type:String,
        required: true
    },
    Phone_No: {
        type:String,
        required: true
    },
    Has_Paid: {
        type:String,
        required: true
    },
    order_id: {
        type: String
    }
})
const Coding = mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Email: {
        type:String,
        required: true
    },
    Phone_No: {
        type:String,
        required: true
    },
    Has_Paid: {
        type:String,
        required: true
    },
    order_id: {
        type: String
    }
})
const Quiz = mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Email: {
        type:String,
        required: true
    },
    Phone_No: {
        type:String,
        required: true
    },
    Has_Paid: {
        type:String,
        required: true
    },
    order_id: {
        type: String
    }
})

const PPTS = mongoose.model('PPT', PPT);
const WebS = mongoose.model('Web', Web);
const CodingS = mongoose.model('Coding', Coding);
const QuizS = mongoose.model('quiz', Quiz);

// Export models
module.exports = {
    PPTS,
    WebS,
    CodingS,
    QuizS
};