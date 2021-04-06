import { Response, Request } from 'express';

import { postgres } from '../models';

export class TopicController {
    // TODO: необходимо реализовать контроллер getById для странички конкретного топика,
    // за счет этого тут контракт легче будет (без description)
    public static getAll(req: Request, res: Response) {
        postgres.topics.table.findAll()
            .then((dbResult) => res.status(200).send(dbResult))
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    public static update(req: Request, res: Response) {
        postgres.topics.table
            .findByPk(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Topic not found',
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
