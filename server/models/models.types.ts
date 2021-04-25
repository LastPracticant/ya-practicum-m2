import { UserInfoProps } from 'client/core/api';

export interface CommonModelProps {
    id: number
    createdAt: Date
    updatedAt: Date
}

export interface LeaderboardModelProps extends CommonModelProps {
    userId: number
    score: number
}

export interface TopicModelProps extends CommonModelProps {
    name: string
    description: string
    userId: number
    user: UserInfoProps
}

export interface CommentModelProps extends CommonModelProps {
    description: string
    userId: number
    topicId: number
    emoji?: string
    parentId?: number
    user: UserInfoProps
}

export interface EmojiParsedProps {
    [key: string]: number[]
}

export interface UserModelProps extends CommonModelProps {
    userExternalId: number
    name: string
    settings: string
}
