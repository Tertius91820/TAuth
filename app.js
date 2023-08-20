const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const ConnectDB = require('./config/db')
const { connect } = require('mongoose')

//load env
dotenv.config({path: './config/.env'})
ConnectDB()

const app = express()
//logging
if(process.env.NODE_ENV =='development'){
  app.use(morgan('dev'))
}
//Handlebars
app.engine('.hbs',exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'})
    )
app.set('view engine','.hbs')

//Routes
app.use('/', require('./routes/index'))
//app.use('/dashboard', require('./routes/index')) not needed as its already on '/'


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))