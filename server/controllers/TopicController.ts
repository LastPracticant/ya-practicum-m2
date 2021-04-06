import { Response, Request } from 'express';

import { postgres } from '../models';

export class TopicController {
    public static getAll(req: Request, res: Response) {
        postgres.topics.table.findAll()
            .then((dbResult) => res.status(200).send(dbResult))
            .catch((error) => {
                res.status(400).send(error);
            });
    }
}
