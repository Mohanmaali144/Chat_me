const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const { initSocket } = require('./socket/index')
const path = require("path");
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');

const corsOptions = {
  // origin: process.env.CLIENT_URL,
  origin: "http://localhost:5173",
  credentials: true
};
app.use('/public/images', express.static(path.join(__dirname, '/public/images')));
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SIGNATURE))
app.use(bodyParser.json());

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hi there!')
})

// mongoose.connect(process.env.MONGO_URI)
mongoose.connect("mongodb://localhost:27017/chat_me")
  .then((temp) => {
    console.log("DB connection Success")
  })
  .catch((err) => console.log('DB connection Error', err.message))

// const server = app.listen(process.env.PORT, () => {
const server = app.listen(5000, () => {
  console.log(`App is listening to port ${5000}`)
})

// socket.io
initSocket(server, corsOptions)

module.exports = app;