
'use strict'

// Requiring our models
const db = require('../models')
const { Op } = require('sequelize')

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../middleware/isAuthenticated')


module.exports = app => {

  //
  //
  // users
  //
  //

  // This route handler makes use of the new async/await syntax
  // for resolving asynchronous code.
  app.get('/users', async function(req, res) {

    try {
      const findOptions = {
        where: {
          id: {
            // This little bit of syntax `[Op.ne]` is another new feature: 
            // "Computed property names in object literals"
            // Which just means that it will evaluate the expression inside
            // the square brackets and whatever it evaluates to will be the
            // name of the property. There were already computed property names
            // before this, but they could only be used on the variables an object
            // had been assigned to. For instance, the old way would look like:
            /*
              var name = 'David'
              var obj = {}
              obj[ name ] = 'Some goober'
            */
            // At the end of those three lines of code `obj` would be: `{ David: 'Some goober' }`
            // This new feature allows for you to combine the last two lines to that it looks like:
            /*
              var name = 'David'
              var obj = { [ name ]: 'Some goober' }
            */
            
            [Op.ne]: req.user.id
          }
        }
      }
      const users = await db.User.findAll(findOptions)

      res.json({ users })
    }
    catch (err) {
      console.log('Error getting user: ', err)
      res.status(500).send('Error getting users.')
    }

  })

  // The equivalent handler written using promises would look like the following:
  /*
  app.get('/users', function(req, res) {

    const findOptions = {
      where: {
        id: {
          [Op.ne]: req.user.id
        }
      }
    }

    db.User.findAll(findOptions)
      .then(function(users) {

        res.json({ users })

      })
      .catch(function(err) {
        console.log('Error getting user: ', err)
        res.status(500).send('Error getting users.')
      })

  })
  */

  //
  //
  // conversations
  //
  //

  app.get('/conversations', async function(req, res) {

    try {
      const findOptions = {
        include: [
          {
            model: db.Message,
            order: [['createdAt', 'DESC']],
            include: [{ model: db.User }]
          },
          db.User
        ],
        order: [['createdAt', 'DESC']]
      }
      const user = await db.User.findOne({ where: { id: req.user.id }})
      const conversations = await user.getConversations(findOptions)

      res.json(conversations)
    }
    catch (err) {
      console.log('Error getting conversations: ', err)
      res.status(500).send('Error getting conversations')
    }

  })

  app.post('/conversations', async function(req, res) {

    const { users, title } = req.body
    users.push(req.user)

    try {
      const conversation = await db.Conversation.create({ title })
      const findOptions = {
        where: {
          id: {
            [Op.in]: users.map( u => u.id )
          }
        }
      }
      const userInstances = await db.User.findAll(findOptions)
      await conversation.setUsers(userInstances)

      res.json(conversation)
    }
    catch (err) {
      console.log('Error creating conversation: ', err)
      res.status(500).send('Error creating conversation')
    }
  })



  //
  //
  // messages
  //
  //

  app.post('/messages', async function(req, res) {
    
    try {
      const message = await db.Message.create(req.body)

      res.json(message)
    }
    catch (err) {
      console.log('Error creating message: ', err)
      res.status(500).send('Error creating message')
    }

  })

}
