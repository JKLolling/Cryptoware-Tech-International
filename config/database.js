// Does sequelize just look for a databasae.js file?
//  yes, as specified by sequelizerc

const {
    db: { username, password, database, host },
} = require('./index');

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        logging: false
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
    }
};