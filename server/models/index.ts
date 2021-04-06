import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { POSTGRES_CONNECT_OPTIONS } from '../../env';
import { CompanyModel } from './CompanyModel';
import { UserModel } from './UserModel';

class PostgresConnector {
    sequelize: Sequelize;

    users: UserModel;

    companies: CompanyModel;

    constructor() {
        this.sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS as SequelizeOptions);
        this.users = new UserModel(this.sequelize);
        this.companies = new CompanyModel(this.sequelize);
        this.companies.table.hasMany(this.users.table, { onDelete: 'cascade' });
    }

    sync() {
        this.sequelize.sync({ force: true }).then(() => {
            console.info('--------------- Postgres sync successful. ---------------');
        })
            .catch(console.error);
    }
}

export const postgres = new PostgresConnector();
