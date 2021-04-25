import { postgres } from '../models';

export const users = {
    model: postgres.users.table,
    attributes: { exclude: ['createdAt', 'updatedAt', 'settings'] },
};
