import { Sequelize } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { UserModelProps } from './models.types';

export class UserModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<UserModelProps & Model>('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            settings: {
                type: DataTypes.JSONB,
            },
        });
    }
}
