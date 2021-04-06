import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommentModelProps } from './models.types';

export class CommentModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<CommentModelProps>('comment', {
            description: {
                type: DataTypes.TEXT,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            parentId: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        });
    }
}
