import { Response, Request } from 'express';

import { postgres } from '../models';

export class EmojiController {
    public static add(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        postgres.emojis.table
            .create(req.body)
            .then((comment) => res.status(200).send(comment))
            .catch((error) => res.status(400).send(error));
    }
}
