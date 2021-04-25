import {
    Sequelize, SequelizeOptions,
} from 'sequelize-typescript';

import { TopicModel } from './TopicModel';
import { CommentModel } from './CommentModel';
import { UserModel } from './UserModel';
import { LeaderboardModel } from './LeaderboardModel';
import { POSTGRES_CONNECT_OPTIONS } from '../../env';

class PostgresConnector {
    sequelize: Sequelize;

    comments: CommentModel;

    topics: TopicModel;

    users: UserModel;

    leaderboard: LeaderboardModel;

    constructor() {
        this.sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS as SequelizeOptions);

        this.comments = new CommentModel(this.sequelize);
        this.topics = new TopicModel(this.sequelize);
        this.users = new UserModel(this.sequelize);
        this.leaderboard = new LeaderboardModel(this.sequelize);

        this.leaderboard.table.belongsTo(this.users.table);
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
