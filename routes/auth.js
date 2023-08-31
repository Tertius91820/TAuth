const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc Auth with Google
//@route GET /auth/google
router.get('/google', passport.authenticate('google',{scope:['profile']}))

//@desc Google auth callback
//@route GET /auth/google/callback
router.get(
  '/google/callback',
   passport.authenticate('google', {failureRedirect:'/'}),
   (req,res) => {
  res.redirect('/dashboard')
  }
)

//@desc Logout User
//@route /auth/logout
// router.get('/logout', (req,res) => {
//   req.logout()
//     res.redirect('/')
//   })


//gpt changes
// router.get('/logout', async (req, res) => {
//   try {
//     req.logout(); // Assuming this function handles the user logout

//     // Redirect to the root path after logout
//     res.redirect('/');
//   } catch (err) {
//     // Handle any errors that occur during logout
//     console.error('Logout error:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });


router.get('/logout', (req,res,next) => {
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('/')
  })
  })




module.exports = router