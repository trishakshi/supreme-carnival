require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));

mongoose.connect(process.env.MONGO_URI, () => console.log('Connected to MONGO DB'))

app.use('/auth', require('./routes/userRoute'))
app.use('/media', require('./routes/mediaRoute'))