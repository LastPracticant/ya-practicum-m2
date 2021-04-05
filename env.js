const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    IS_DEV: isDev,
    MONGO_HOST: `mongodb://${isDev ? 'localhost' : 'mongo'}:27017`,
    POSTGRES_HOST: `postgres://postgres:${process.env.POSTGRES_PASSWORD}@${isDev ? 'localhost' : 'postgres'}:5436/postgres`,
    APP_PROD_URL: 'https://last-practicant.herokuapp.com',
    APP_DEV_URL: 'http://localhost:5000',
};
