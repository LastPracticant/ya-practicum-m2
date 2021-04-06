import { Model } from 'sequelize';

export interface TopicModelProps extends Model {
    id: number;
    name: string;
    description: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentModelProps extends Model {
    id: number;
    description: string;
    userId: number;
    parentId: number;
    createdAt: Date;
    updatedAt: Date;
}
