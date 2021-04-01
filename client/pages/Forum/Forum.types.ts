export interface ForumTopicCommentProps {
    id: number
    description: string
    date: string
    author: string
    parentId: number
    children?: ForumTopicCommentProps[]
}
