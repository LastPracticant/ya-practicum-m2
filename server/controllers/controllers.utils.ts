import { postgres } from '../models';
import { users } from './controllers.mixins';

export const fetchTopics = () => postgres.topics.table.findAll({
    attributes: { exclude: ['description'] },
    order: [
        ['updatedAt', 'ASC'],
    ],
    include: [users],
});

export const fetchTopicById = (topicId: string) => postgres.topics.table.findByPk(topicId);

export const fetchTopicComments = (topicId: string) => postgres.comments.table.findAll({
    where: {
        topicId,
    },
    include: [users],
    order: [
        ['id', 'ASC'],
    ],
});

export const fetchUserSettings = (userId: number) => postgres.users.table.findByPk(userId);
