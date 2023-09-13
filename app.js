const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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

//Method override middleware
app.use(methodOverride(function (req,res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    //look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

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
const { formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs')

//Handlebars
//!add the word .engine after exphbs
app.engine('.hbs',exphbs.engine({
    helpers:{
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs'})
    )
app.set('view engine','.hbs')


//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//set global variable middleware
app.use(function (req,res, next) {
  res.locals.user = req.user || null
  next()
})

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