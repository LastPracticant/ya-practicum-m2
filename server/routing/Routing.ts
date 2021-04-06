import express, { Express } from 'express';
import path from 'path';
import {
    AuthController,
    CommentController,
    ProfileController,
    TopicController,
} from '../controllers';

export function routing(app: Express) {
    const jsonParser = express.json();

    app.use(express.static(path.join(__dirname, './dist')));

    /** Аутентификация */
    app.get('/api/v2/auth/user', AuthController.checkAuth);
    app.get('/api/v2/oauth/yandex/service-id', AuthController.OAuthGetServiceId);
    app.post('/api/v2/oauth/yandex', jsonParser, AuthController.OAuth);
    app.post('/api/v2/auth/signin', jsonParser, AuthController.signin);
    app.post('/api/v2/auth/signup', jsonParser, AuthController.signup);
    app.post('/api/v2/auth/logout', jsonParser, AuthController.logout);

    /** Форум */
    app.get('/api/v2/internal/forum/topic', TopicController.getAll);
    app.put('/api/v2/internal/forum/topic', TopicController.update);
    app.get('/api/v2/internal/forum/comment', CommentController.getAll);
    app.put('/api/v2/internal/forum/comment', CommentController.update);

    /** Профайл */
    app.put('/api/v2/user/profile', jsonParser, ProfileController.change);
    app.put('/api/v2/user/password', jsonParser, ProfileController.changePassword);

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
