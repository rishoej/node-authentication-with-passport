const express = require('express')
const app = express()
const passport = require('passport')
const dotenv = require('dotenv')
const session = require('express-session')

dotenv.load({ path: '.env' })
app.use(session({secret: process.env.SESSION_SECRET}))
app.use(passport.initialize())
app.use(passport.session())

require('./utils/passport')
require('./routes/auth')(app)

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/')
}

app.get('/', (req, res) => {
  let html = `
  <ul>
    <li><a href='/auth/github'>GitHub</a></li>
    <li><a href='/auth/google'>Google</a></li>
    <li><a href='/auth/facebook'>Facebook</a></li>
    <li><a href='/protected'>Protected content</a></li>
  </ul>
`

  // dump the user informations available
  if (req.isAuthenticated()) {
    html += `
      <a href='/logout'>logout</a>
      <p>Authenticated as user:</p>
      <pre>${JSON.stringify(req.user, null, 4)}</pre>
    `
  }

  res.send(html)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/protected', ensureAuthenticated, (req, res) => {
  res.send('Acess granted')
})

const PORT  = process.env.PORT || 3000
app.listen(PORT)
console.log(`Running at http://localhost:${PORT}`)
