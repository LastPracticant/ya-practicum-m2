export interface TopicModelProps {
    id: number
    name: string
    description: string
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface CommentModelProps {
    id: number
    description: string
    userId: number
    createdAt: Date
    updatedAt: Date
    topicId: number
    emoji?: string
    parentId?: number
}

export interface EmojiParsedProps {
    [key: string]: number[]
}

export interface UserModelProps {
    id: number
    userExternalId: number
    name: string
    createdAt: Date
    updatedAt: Date
}
