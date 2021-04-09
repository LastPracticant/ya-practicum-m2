import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

interface UserInfoProps {
    id: number
    name: string
}

export interface AddTopicRequestProps extends Omit<TopicModelProps, 'createdAt' | 'updatedAt'> {}

export interface AddCommentRequestProps extends Omit<CommentModelProps, 'createdAt' | 'updatedAt'> {}

export interface GetAllCommentsRequestProps {
    topicId: number
}

export interface GetAllTopicsResponseProps extends TopicModelProps {
    user: UserInfoProps
}

export interface GetAllCommentsResponseProps extends CommentModelProps {
    user: UserInfoProps
}

export class ForumAPI extends BaseAPI {
    static getAllTopics() {
        return ExpressForumAPI.get<{}, GetAllTopicsResponseProps[]>('/topic');
    }

    static getTopicById(data: GetAllCommentsRequestProps) {
        return ExpressForumAPI.get<{}, GetAllTopicsResponseProps>(`/topic/${data.topicId}`);
    }

    static addTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.post<AddTopicRequestProps, Response>('/topic', { data });
    }

    static updateTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.put<AddTopicRequestProps, Response>('/topic', { data });
    }

    static getAllComments(data: GetAllCommentsRequestProps) {
        return ExpressForumAPI.get<{}, GetAllCommentsResponseProps[]>(`/comment/${data.topicId}`);
    }

    static addComment(data: AddCommentRequestProps) {
        return ExpressForumAPI.post<AddCommentRequestProps, Response>('/comment', { data });
    }

    static updateComment(data: AddCommentRequestProps) {
        return ExpressForumAPI.put<AddCommentRequestProps, Response>('/comment', { data });
    }
}
