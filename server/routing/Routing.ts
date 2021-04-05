import express, { Express } from 'express';
import path from 'path';
import { AuthController, ProfileController } from '../controllers';

export function routing(app: Express) {
    const jsonParser = express.json();

    app.use(express.static(path.join(__dirname, './dist')));

    app.get('/api/v2/auth/user', AuthController.checkAuth);
    app.get('/api/v2/oauth/yandex/service-id', AuthController.OAuthGetServiceId);
    app.post('/api/v2/oauth/yandex', jsonParser, AuthController.OAuth);
    // TODO: сломалась авторизация
    app.post('/api/v2/auth/signin', jsonParser, AuthController.Signin);
    app.post('/api/v2/auth/signup', jsonParser, AuthController.Signup);
    app.post('/api/v2/auth/logout', jsonParser, AuthController.logout);

    app.put('/api/v2/user/profile', jsonParser, ProfileController.change);
    app.put('/api/v2/user/password', jsonParser, ProfileController.changePassword);

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
