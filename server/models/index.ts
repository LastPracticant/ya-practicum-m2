import {
    Sequelize,
} from 'sequelize-typescript';

import { POSTGRES_CONNECT_OPTIONS } from '../../env';
import { TopicModel } from './TopicModel';
import { CommentModel } from './CommentModel';
import { UserModel } from './UserModel';

class PostgresConnector {
    sequelize: Sequelize;

    comments: CommentModel;

    topics: TopicModel;

    users: UserModel;

    constructor() {
        this.sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS || '', {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });
        this.comments = new CommentModel(this.sequelize);
        this.topics = new TopicModel(this.sequelize);
        this.users = new UserModel(this.sequelize);

        this.topics.table.belongsTo(this.users.table);
        this.comments.table.belongsTo(this.users.table);
        this.topics.table.hasMany(this.comments.table, { onDelete: 'cascade' });
    }

    sync() {
        this.sequelize.sync().then(() => {
            console.info('--------------- Postgres sync successful. ---------------');
        })
            .catch(console.error);
    }
}

export const postgres = new PostgresConnector();
