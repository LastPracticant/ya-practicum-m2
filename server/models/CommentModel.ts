import { Sequelize } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';

export interface CommentModelProps extends Model {
    id: number;
    description: string;
    userId: number;
    parentId: number;
    createdAt: Date;
    updatedAt: Date;
}

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
