module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        num_fake_products: process.env.DB_NUM_FAKE_PRODUCTS,
        num_fake_users: process.env.DB_NUM_FAKE_USERS,
    },
};