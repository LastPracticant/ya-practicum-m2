import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

type UpdateTopicProps = Pick<TopicModelProps, 'id' | 'name' | 'description' | 'userId'>;
type UpdateCommentProps = Pick<CommentModelProps, 'id' | 'description' | 'userId' | 'parentId'>;
type GetAllCommentsProps = {
    topicId: number
};

export class ForumAPI extends BaseAPI {
    static getAllTopics() {
        return ExpressForumAPI.get<{}, TopicModelProps[]>('/topic');
    }

    static updateTopic(data: UpdateTopicProps) {
        return ExpressForumAPI.put<UpdateTopicProps, Response>('/topic', { data });
    }

    static getAllComments(data: GetAllCommentsProps) {
        return ExpressForumAPI.get<{}, CommentModelProps[]>('/comment', { data });
    }

    static updateComment(data: UpdateCommentProps) {
        return ExpressForumAPI.put<UpdateCommentProps, Response>('/comment', { data });
    }
}
