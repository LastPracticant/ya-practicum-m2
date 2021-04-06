import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import {
    POSTGRES_CONNECT_OPTIONS,
} from '../../env';
import { UserModel } from './users';

class PostgresConnector {
    sequelize: Sequelize;

    users: UserModel;

    constructor() {
        this.sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS as SequelizeOptions);
        this.users = new UserModel(this.sequelize);
    }

    sync() {
        this.sequelize.sync({ force: true }).then(() => {
            console.info('--------------- Postgres sync successful. ---------------');
        })
            .catch(console.error);
    }
}

export const postgres = new PostgresConnector();
