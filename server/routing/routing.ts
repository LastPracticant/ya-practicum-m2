import express, { Express } from 'express';
import path from 'path';
import { checkAuth } from 'server/middlewares';
import {
    AuthController,
    CommentController,
    ProfileController,
    TopicController,
    LeaderboardController,
    UserController,
} from '../controllers';

export const routing = (app: Express) => {
    const jsonParser = express.json();

    app.get('*.(js|json|css|png|jpe?g|gif|mp3)$', (req, res) => {
        res.sendFile(path.join(__dirname, req.path));
    });

    /** Аутентификация */
    app.get('/api/v2/auth/user', AuthController.checkAuth);
    app.get('/api/v2/oauth/yandex/service-id', AuthController.OAuthGetServiceId);
    app.post('/api/v2/oauth/yandex', jsonParser, AuthController.OAuth);
    app.post('/api/v2/auth/signin', jsonParser, AuthController.signin);
    app.post('/api/v2/auth/signup', jsonParser, AuthController.signup);
    app.post('/api/v2/auth/logout', jsonParser, AuthController.logout);

    /** Форум */
    app.get('/api/v2/internal/forum/topics', checkAuth, TopicController.getAll);
    app.get('/api/v2/internal/forum/topic/:topicId', checkAuth, TopicController.getById);
    app.post('/api/v2/internal/forum/topic', checkAuth, jsonParser, TopicController.add);
    app.put('/api/v2/internal/forum/topic', checkAuth, jsonParser, TopicController.update);
    app.get('/api/v2/internal/forum/comments/:topicId', checkAuth, CommentController.getAll);
    app.post('/api/v2/internal/forum/comment', checkAuth, jsonParser, CommentController.add);
    app.put('/api/v2/internal/forum/comment', checkAuth, jsonParser, CommentController.update);

    /** Таблица лидеров */
    app.get('/api/v2/internal/leaderboard', checkAuth, LeaderboardController.getPlayersScores);
    app.get('/api/v2/internal/leaderboard/:playerId', checkAuth, LeaderboardController.getScoreByPlayerId);
    app.post('/api/v2/internal/leaderboard', checkAuth, jsonParser, LeaderboardController.addPlayerScore);

    /** Настройки */
    app.get('/api/v2/internal/settings/:userId', checkAuth, UserController.getUserSettings);
    app.put('/api/v2/internal/settings', checkAuth, jsonParser, UserController.updateUserSettings);

    /** Профайл */
    app.put('/api/v2/user/profile', jsonParser, ProfileController.change);
    app.put('/api/v2/user/password', jsonParser, ProfileController.changePassword);

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
};
