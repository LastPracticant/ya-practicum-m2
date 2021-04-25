import { Response, Request } from 'express';

import { postgres } from '../models';
import { RESPONSES_MESSAGES } from './controllers.consts';
import { fetchUserSettings } from './controllers.utils';

export class UserController {
    public static getUserSettings(req: Request, res: Response) {
        fetchUserSettings(Number(req.params.userId))
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    }

    public static updateUserSettings(req: Request, res: Response) {
        postgres.users.table
            .findByPk(req.body.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: RESPONSES_MESSAGES['404'],
                    });
                }
                return user
                    .update({ settings: req.body.settings })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}
