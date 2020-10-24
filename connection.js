const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = require('./models/user');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return User.sync();
    })
    .then(result => {
        console.log(`User table created`);
        User.bulkCreate([
            {
                name: "admin",
                email: "admin@netenrich.com",
                pwd: "admin!1994",
                access_level: "admin",
            }, 
            {
                name: "anna",
                email: "anna@netenrich.com",
                pwd: "@nnahalfm4n",
                access_level: "user",
            }, 
        ])
        .then(() => console.log("Admin User Created !"));
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
