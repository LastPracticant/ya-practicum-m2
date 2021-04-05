import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserInstance extends Model {
    id: number;
    name: string;
}

// UserModel
export const connectToUsers = (sequelize: Sequelize) => {
    sequelize.define<UserInstance>('user', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
            type: DataTypes.STRING,
        },
    });
};
