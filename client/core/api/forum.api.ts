import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

export type AddTopicRequestProps = Pick<TopicModelProps, 'id' | 'name' | 'description' | 'userId'>;
export type AddCommentRequestProps = Pick<CommentModelProps, 'id' | 'description' | 'userId' | 'parentId'>;
export type GetAllCommentsRequestProps = {
    topicId: number
};
export interface GetAllTopicsResponseProps extends TopicModelProps {
    user: {
        id: number
        name: string
    }
}

export class ForumAPI extends BaseAPI {
    static getAllTopics() {
        return ExpressForumAPI.get<{}, GetAllTopicsResponseProps[]>('/topic');
    }

    static addTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.post<AddTopicRequestProps, Response>('/topic', { data });
    }

    static updateTopic(data: AddTopicRequestProps) {
        return ExpressForumAPI.put<AddTopicRequestProps, Response>('/topic', { data });
    }

    static getAllComments(data: GetAllCommentsRequestProps) {
        return ExpressForumAPI.get<{}, CommentModelProps[]>(`/comment/${data.topicId}`);
    }

    static addComment(data: AddCommentRequestProps) {
        return ExpressForumAPI.post<AddCommentRequestProps, Response>('/comment', { data });
    }

    static updateComment(data: AddCommentRequestProps) {
        return ExpressForumAPI.put<AddCommentRequestProps, Response>('/comment', { data });
    }
}
