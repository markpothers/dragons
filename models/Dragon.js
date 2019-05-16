const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize

// ^ Same as: 
// const STRING = Sequelize.STRING


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


const Dragon = sequelize.define('dragon', {
    name: {
        type: STRING,
    },
    image: {
        type: STRING
    },
    description:{
        type: STRING
    },
    atWar:{
        type: BOOLEAN
    },
});

module.exports = Dragon

sequelize.sync()

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });