const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')//(session)
const ConnectDB = require('./config/db')


//load .env
dotenv.config({path: './config/.env'})

//Passport config
require('./config/passport')(passport)

ConnectDB()

const app = express()

//Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//logging
if(process.env.NODE_ENV =='development'){
  app.use(morgan('dev'))
}

//Sessions middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI})
    //cookie: {secure:true} needs https on deployment
}))

//Handlebars Helpers
const { formatDate } = require('./helpers/hbs')

//Handlebars
//!add the word .engine after exphbs
app.engine('.hbs',exphbs.engine({
    helpers:{formatDate,
    },
    defaultLayout: 'main',
    extname: '.hbs'})
    )
app.set('view engine','.hbs')


//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))
//app.use('/dashboard', require('./routes/index')) not needed as its already on '/'


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)) 