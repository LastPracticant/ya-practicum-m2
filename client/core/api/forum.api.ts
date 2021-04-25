import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

export interface AddTopicRequestProps extends Omit<TopicModelProps, 'createdAt' | 'updatedAt' | 'user'> {}

export interface AddCommentRequestProps extends Omit<CommentModelProps, 'createdAt' | 'updatedAt' | 'user'> {}

export interface UpdateCommentRequestProps extends Omit<CommentModelProps, 'createdAt' | 'updatedAt' | 'parendId' | 'user'> {}

export interface GetAllCommentsRequestProps {
    topicId: number
}

export class ForumAPI extends BaseAPI {
    static getAllTopics() {
        return ExpressForumAPI.get<{}, TopicModelProps[]>('/topics');
    }

    static getTopicById(data: GetAllCommentsRequestProps) {
        return ExpressForumAPI.get<{}, TopicModelProps>(`/topic/${data.topicId}`);
    }

    static addTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.post<AddTopicRequestProps, Response>('/topic', { data });
    }

    static updateTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.put<AddTopicRequestProps, Response>('/topic', { data });
    }

    static getAllComments(data: GetAllCommentsRequestProps) {
        return ExpressForumAPI.get<{}, CommentModelProps[]>(`/comments/${data.topicId}`);
    }

    static addComment(data: AddCommentRequestProps) {
        return ExpressForumAPI.post<AddCommentRequestProps, Response>('/comment', { data });
    }

    static updateComment(data: UpdateCommentRequestProps) {
        return ExpressForumAPI.put<UpdateCommentRequestProps, Response>('/comment', { data });
    }
}
