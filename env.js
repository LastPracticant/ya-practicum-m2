const isDev = process.env.NODE_ENV !== 'production';

const postgresConnectOptions = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

module.exports = {
    IS_DEV: isDev,
    MONGO_HOST: `mongodb://${isDev ? 'localhost' : 'mongo'}:27017`,
    APP_PROD_URL: 'https://last-practicant.herokuapp.com',
    APP_DEV_URL: 'http://localhost:5000',
    POSTGRES_CONNECT_URL: isDev ? process.env.POSTGRES_DEVELOPMENT : process.env.POSTGRES_PRODUCTION,
    POSTGRES_CONNECT_OPTIONS: !isDev ? postgresConnectOptions : {},
};
