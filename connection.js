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
                name: "nedevuser",
                email: "nedevuser@netenrich.com",
                pwd: "nedevuser!1994",
                access_level: "user",
            },
            {
                name: "rocky",
                email: "rocky@netenrich.com",
                pwd: "rocky!1994",
                access_level: "rocky",
            },
            {
                name: "sara",
                email: "sara@netenrich.com",
                pwd: "sara!1994",
                access_level: "sara",
            },
        ])
        .then(() => console.log("Admin User Created !"));
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
