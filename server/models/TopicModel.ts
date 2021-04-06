import { Sequelize } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';

export interface TopicModelProps extends Model {
    id: number;
    name: string;
    description: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

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
