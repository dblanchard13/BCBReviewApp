'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let tableDefinitions = [
      `
      CREATE TABLE conversations (
        id char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        title varchar(255) DEFAULT NULL,
        createdAt datetime NOT NULL,
        updatedAt datetime NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `,
      `
      CREATE TABLE users (
        id char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        username varchar(255) DEFAULT NULL,
        password varchar(255) DEFAULT NULL,
        createdAt datetime NOT NULL,
        updatedAt datetime NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY users_username_unique (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `,
      `
      CREATE TABLE messages (
        id char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        body text,
        createdAt datetime NOT NULL,
        updatedAt datetime NOT NULL,
        ConversationId char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
        UserId char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
        PRIMARY KEY (id),
        KEY ConversationId (ConversationId),
        KEY UserId (UserId),
        CONSTRAINT messages_ibfk_1 FOREIGN KEY (ConversationId) REFERENCES conversations (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT messages_ibfk_2 FOREIGN KEY (UserId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `,
      `
      CREATE TABLE UserConversation (
        createdAt datetime NOT NULL,
        updatedAt datetime NOT NULL,
        ConversationId char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        UserId char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        PRIMARY KEY (ConversationId,UserId),
        KEY UserId (UserId),
        CONSTRAINT userconversation_ibfk_1 FOREIGN KEY (ConversationId) REFERENCES conversations (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT userconversation_ibfk_2 FOREIGN KEY (UserId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `,
    ]


    for (let i = 0; i < tableDefinitions.length; i ++) {
      await queryInterface.sequelize.query( tableDefinitions[i] )
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables()
  }
};
