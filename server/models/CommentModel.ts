import { Sequelize } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { CommentModelProps } from './models.types';

export class CommentModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<CommentModelProps & Model>('comment', {
            description: {
                type: DataTypes.TEXT,
            },
            parentId: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            emoji: {
                type: DataTypes.JSONB,
            },
        });
    }
}
