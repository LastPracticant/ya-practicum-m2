import { TopicModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressForumAPI = new HTTP('/internal/forum');

export class ForumAPI extends BaseAPI {
    static getAll() {
        return ExpressForumAPI.get<{}, TopicModelProps>('/topic');
    }
}
