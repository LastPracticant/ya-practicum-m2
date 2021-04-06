import { Sequelize } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';

interface UserInstance extends Model {
    name: string;
}

export class CompanyModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<UserInstance>('company', {
            name: {
                type: DataTypes.STRING,
            },
        });
    }
}
