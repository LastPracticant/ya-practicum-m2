import { Sequelize } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { TopicModelProps } from './models.types';

export class TopicModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<TopicModelProps & Model>('topic', {
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
        });
    }
}
