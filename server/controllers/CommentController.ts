import { Response, Request } from 'express';

import { postgres } from '../models';
import { RESPONSES_MESSAGES } from './controllers.consts';
import { fetchTopicComments } from './controllers.utils';

export class CommentController {
    public static getAll(req: Request, res: Response) {
        fetchTopicComments(req.params.topicId)
            .then((comments) => res.status(200).send(comments))
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    public static add(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        postgres.comments.table
            .create(req.body)
            .then((comment) => res.status(200).send(comment))
            .catch((error) => res.status(400).send(error));
    }

    public static update(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        postgres.comments.table
            .findByPk(req.body.id)
            .then((comment) => {
                if (!comment) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return comment
                    .update({ emoji: req.body.emoji })
                    .then(() => res.status(200).send(comment))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}
