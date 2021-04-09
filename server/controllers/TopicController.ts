import { Response, Request } from 'express';

import { postgres } from '../models';
import { RESPONSES_MESSAGES } from './controllers.consts';

export class TopicController {
    public static getAll(req: Request, res: Response) {
        postgres.topics.table.findAll({
            attributes: { exclude: ['description'] },
            order: [
                ['updatedAt', 'ASC'],
            ],
            include: [
                {
                    model: postgres.users.table,
                },
            ],
        })
            .then((topics) => res.status(200).send(topics))
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    public static getById(req: Request, res: Response) {
        postgres.topics.table.findByPk(req.params.topicId)
            .then((topic) => {
                if (!topic) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return res.status(200).send(topic);
            })
            .catch((error) => res.status(400).send(error));
    }

    public static add(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        postgres.topics.table
            .create(req.body)
            .then((topic) => res.status(200).send(topic))
            .catch((error) => res.status(400).send(error));
    }

    public static update(req: Request, res: Response) {
        postgres.topics.table
            .findByPk(req.params.id)
            .then((topic) => {
                if (!topic) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return topic
                    .update(req.body)
                    .then(() => res.status(200).send(topic))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}
