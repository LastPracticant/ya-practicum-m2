const isDev = process.env.NODE_ENV !== 'production';

const postgresProdConnectOptions = {
    protocol: 'postgres',
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
    APP_PROD_URL: 'https://last-practicant.herokuapp.com/',
    APP_DEV_URL: 'http://localhost:5000',
    POSTGRES_CONNECT_OPTIONS: !isDev ? postgresProdConnectOptions : {
        port: 5436,
    },
};
