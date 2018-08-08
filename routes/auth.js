
'use strict'

// Requiring our models
const db = require('../models')

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../middleware/isAuthenticated')


module.exports = (app, passport) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, then respond with the user.
  // Otherwise send an error

  // This function makes use of object destructuring when defining the
  // argument names for the route handler function which can be easy
  // to miss if you're not looking for it. Note the `({ user }` part
  // where this is happening.
  app.post('/login', passport.authenticate('local'), ({ user }, res) => {
    res.send({ user })
  })
  // The equivalent function in old JS would look like:
  /*
  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send({ user: req.user })
  })
  */


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/signup', async function(req, res, next) {

    const { username, password } = req.body

    try {
      await db.User.create({ username, password })
      next()
    }
    catch (err) {
      res.json(err)
    }

  }, passport.authenticate('local'), ({ user }, res) => {
    res.send({ user })
  })

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout()
    res.send({})
  })

  // This commented out code is meant to demonstrate that route handlers
  // in express (ie the function definitions you pass to `app.get` after
  // the route to match on) can be used as passthrough functions that
  // perform a specific task and then call `next` which is the 3rd
  // argument that express passes to handler functions.

  // app.get('/list_of_handlers', handler1, handler2, handler3, handler4)

  // function handler1(req, res, next) {
  //   req.handler1Called = true
  //   console.log('')
  //   console.log('in handler 1')
  //   console.log('')
  //   next()
  // }

  // function handler2(req, res, next) {
  //   req.handler2Called = true
  //   console.log('')
  //   console.log('in handler 2')
  //   console.log('')

  //   next()
  // }

  // function handler3(req, res, next) {
  //   req.handler3Called = true
  //   console.log('')
  //   console.log('in handler 3')
  //   console.log('')

  //   next()
  // }

  // function handler4(req, res, next) {
  //   const { handler1Called, handler2Called, handler3Called } = req

  //   console.log('')
  //   console.log('in handler 4')
  //   console.log('')


  //   if ( handler1Called && handler2Called && handler3Called ) {
  //     res.send('Success!')
  //   }
  //   else {
  //     res.status(500).send('Oh noes!')
  //   }
  // }


  // Route for client to check if there's still a live server session
  app.get('/session', isAuthenticated, (req, res) => {
    const { username, id } = req.user

    res.json({ user: { username, id }})
  })

}
