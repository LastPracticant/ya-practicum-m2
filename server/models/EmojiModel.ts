import { Sequelize } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { EmojiModelProps } from './models.types';

export class EmojiModel {
    sequelize: Sequelize;

    table;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;

        this.table = this.init();
    }

    init() {
        return this.sequelize.define<EmojiModelProps & Model>('emoji', {
            commentId: {
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            userEmoji: {
                type: DataTypes.JSONB,
            },
        });
    }
}
