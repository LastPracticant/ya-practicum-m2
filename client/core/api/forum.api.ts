import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

export type AddTopicProps = Pick<TopicModelProps, 'id' | 'name' | 'description' | 'userId'>;
export type AddCommentProps = Pick<CommentModelProps, 'id' | 'description' | 'userId' | 'parentId'>;
export type GetAllCommentsProps = {
    topicId: number
};

export class ForumAPI extends BaseAPI {
    static getAllTopics() {
        return ExpressForumAPI.get<{}, TopicModelProps[]>('/topic');
    }

    static addTopic(data: AddTopicProps) {
        return ExpressForumAPI.post<AddTopicProps, Response>('/topic', { data });
    }

    static updateTopic(data: AddTopicProps) {
        return ExpressForumAPI.put<AddTopicProps, Response>('/topic', { data });
    }

    static getAllComments(data: GetAllCommentsProps) {
        return ExpressForumAPI.get<{}, CommentModelProps[]>(`/comment/${data.topicId}`);
    }

    static addComment(data: AddCommentProps) {
        return ExpressForumAPI.post<AddCommentProps, Response>('/comment', { data });
    }

    static updateComment(data: AddCommentProps) {
        return ExpressForumAPI.put<AddCommentProps, Response>('/comment', { data });
    }
}
