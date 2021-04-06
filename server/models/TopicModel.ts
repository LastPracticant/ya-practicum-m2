import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { TopicModelProps } from './models.types';

export class TopicModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<TopicModelProps>('topic', {
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
        });
    }
}
