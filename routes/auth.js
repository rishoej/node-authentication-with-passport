const passport = require('passport')

module.exports = app => {
  // Login routes
  app.get('/auth/github', passport.authenticate('github'))
  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
  app.get('/auth/facebook', passport.authenticate('facebook'))


  // Login callback
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )
}
