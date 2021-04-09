import express, { Express } from 'express';
import path from 'path';
import { EmojiController } from 'server/controllers/EmojiController';
import { checkAuth } from 'server/middlewares';
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
    app.get('/api/v2/internal/forum/topic', checkAuth, TopicController.getAll);
    app.get('/api/v2/internal/forum/topic/:topicId', checkAuth, TopicController.getById);
    app.post('/api/v2/internal/forum/topic', checkAuth, jsonParser, TopicController.add);
    app.put('/api/v2/internal/forum/topic', checkAuth, jsonParser, TopicController.update);
    app.get('/api/v2/internal/forum/comment/:topicId', checkAuth, CommentController.getAll);
    app.post('/api/v2/internal/forum/comment', checkAuth, jsonParser, CommentController.add);
    app.put('/api/v2/internal/forum/comment', checkAuth, jsonParser, CommentController.update);
    app.post('/api/v2/internal/forum/emoji', checkAuth, jsonParser, EmojiController.add);

    /** Профайл */
    app.put('/api/v2/user/profile', jsonParser, ProfileController.change);
    app.put('/api/v2/user/password', jsonParser, ProfileController.changePassword);

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
