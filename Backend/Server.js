const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const code = require('./Tect_Routers/Tech')
const Non_code = require('./Non_Tech_Routers/Non_Tech')


app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDB Connected da...")
}).catch((error)=>{
    console.log(error)
})

app.use('/api/cse',code)
app.use('/api/cse',Non_code)



app.listen(2000,()=> {
    console.log("Jiren the Great....")
})