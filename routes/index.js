const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//@desc Login/Landing page
//@route GET /
router.get('/',ensureGuest, (req,res) =>{
  res.render('login',{
    layout: 'login',
  })
})

//@desc Dashboard page
//@route GET /dashboard
router.get('/dashboard',ensureAuth, (req,res) =>{
  res.render('dashboard', {
    name: req.user.firstName[0].toUpperCase()+req.user.firstName.slice(1),
   // info: req.user
  })
})

module.exports = router