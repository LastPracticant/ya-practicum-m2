import { Response, Request } from 'express';

import { postgres } from '../models';
import { RESPONSES_MESSAGES } from './controllers.consts';

export class CommentController {
    public static getAll(req: Request, res: Response) {
        postgres.comments.table.findAll()
            .then((dbResult) => res.status(200).send(dbResult))
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    public static update(req: Request, res: Response) {
        postgres.comments.table
            .findByPk(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return course
                    .update(req.body)
                    .then(() => res.status(200).send(course))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}
