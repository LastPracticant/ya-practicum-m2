const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    IS_DEV: isDev,
    MONGO_HOST: `mongodb://${isDev ? 'localhost' : 'mongo'}:27017`,
    APP_PROD_URL: 'https://last-practicant.herokuapp.com',
    APP_DEV_URL: 'http://localhost:5000',
    POSTGRES_CONNECT_OPTIONS: {
        host: 'localhost',
        port: 5436,
        username: 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        database: 'postgres',
        dialect: 'postgres',
    },
};
