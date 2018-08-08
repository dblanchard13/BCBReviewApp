'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  up: (queryInterface, Sequelize) => {

    const db = require('../models')

    if (process.env.NODE_ENV === 'development') {
      return seedDummyData()
    }

    function seedDummyData() {

      const users = [
        {
          username: 'dblanchard',
          password: '1234'
        },
        {
          username: 'guy',
          password: '1234'
        },
        {
          username: 'gal',
          password: '1234'
        },
        {
          username: 'hal',
          password: '1234'
        },
        {
          username: 'jchrist',
          password: '1234'
        }
      ]
      const userPromises = users.map(({ username, password }) => db.User.create({ username, password }) )

      const convos = [
        {
          title: 'Class stuff'
        },
        {
          title: 'Reeeact'
        },
        {
          title: 'Virtual DOM'
        },
        {
          title: 'YOLO'
        },
        {
          title: 'Beeeer'
        }
      ]
      const convoPromises = convos.map(({ title }) => db.Conversation.create({ title }) )
      let userInstances
      return Promise
        .all( userPromises )
        .then( result => {

          userInstances = result

          return Promise.all( convoPromises )
        })
        .then( convos => {

          const convoUserAssociationPromises = userInstances.map( user => user.setConversations(convos))

          return Promise.all( convoUserAssociationPromises )
        })
        .then(() => {
          console.log('seeded everything.')
        })
        .catch( err => {
          console.log('Error in seeder: ', err)
        })
    }

  },

  down: (queryInterface, Sequelize) => {
  }
};
