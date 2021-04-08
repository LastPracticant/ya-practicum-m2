import { GetAllCommentsResponseProps } from 'client/core/api';

export interface ForumTopicCommentProps extends GetAllCommentsResponseProps {
    children?: ForumTopicCommentProps[]
}
