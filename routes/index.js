const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const  Story = require('../models/story')


//@desc Login/Landing page
//@route GET /
router.get('/',ensureGuest, (req,res) =>{
  res.render('login',{
    layout: 'login',
  })
})

//@desc Dashboard page
//@route GET /dashboard
router.get('/dashboard',ensureAuth, async(req,res) =>{
  try {
    const stories = await Story.find({user: req.user.id}).lean()
    res.render('dashboard', {
      name: req.user.firstName[0].toUpperCase()+req.user.firstName.slice(1),
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('/error/500')
  }

})

module.exports = router