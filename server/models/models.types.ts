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
}

export interface CommentModelProps extends CommonModelProps {
    description: string
    userId: number
    topicId: number
    emoji?: string
    parentId?: number
}

export interface EmojiParsedProps {
    [key: string]: number[]
}

export interface UserModelProps extends CommonModelProps {
    userExternalId: number
    name: string
}
