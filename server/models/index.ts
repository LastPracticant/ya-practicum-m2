import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { POSTGRES_CONNECT_OPTIONS } from '../../env';
import { TopicModel } from './TopicModel';
import { CommentModel } from './CommentModel';

class PostgresConnector {
    sequelize: Sequelize;

    comments: CommentModel;

    topics: TopicModel;

    constructor() {
        this.sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS as SequelizeOptions);
        this.comments = new CommentModel(this.sequelize);
        this.topics = new TopicModel(this.sequelize);
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
