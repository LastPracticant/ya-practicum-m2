import { Sequelize } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { LeaderboardModelProps } from './models.types';

export class LeaderboardModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<LeaderboardModelProps & Model>('leaderboard', {
            score: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        });
    }
}
