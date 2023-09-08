const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./config/db')
const { connect } = require('mongoose')

//load env
dotenv.config({path: './config/.env'})
ConnectDB()

const app = express()

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))