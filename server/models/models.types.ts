export interface TopicModelProps {
    id: number;
    name: string;
    description: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentModelProps {
    id: number;
    description: string;
    userId: number;
    parentId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserModelProps {
    id: number;
    userExternalId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
