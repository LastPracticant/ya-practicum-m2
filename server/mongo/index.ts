import { MongoClient } from 'mongodb';

import { MONGO_HOST } from '../../env';

export class MongoConnector {
    mongo: MongoClient;

    constructor() {
        this.mongo = new MongoClient(MONGO_HOST);
    }

    connect() {
        this.mongo.connect((err) => {
            if (err) {
                console.error('--------------- MongoDB connection error. ---------------');

                throw err;
            }

            console.info('--------------- MongoDB connected. ---------------');
        });
    }
}
