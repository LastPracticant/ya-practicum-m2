import { CommentModelProps } from 'server/models/models.types';

export interface ForumTopicCommentProps extends CommentModelProps {
    children?: ForumTopicCommentProps[]
}
