import { Sequelize } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';

interface UserInstance extends Model {
    id: number;
    name: string;
}

export class UserModel {
    sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.init();
    }

    init() {
        this.sequelize.define<UserInstance>('user', {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            name: {
                type: DataTypes.STRING,
            },
        });
    }
}
