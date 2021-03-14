import {
    Forum,
    Game,
    Leaderboard,
    Profile,
    Signin,
    Signup,
    ErrorPage,
    Home,
    GameStart,
} from 'client/pages';
import { PageComponentProps } from 'client/shared/types';
import React from 'react';

export interface RoutesProps {
    [key: string]: RouteValueProps
}

export interface RouteValueProps {
    path: string
    title: string
    component: React.FC<PageComponentProps>
    params?: string
    fetchData?: Function
    exact?: boolean
}

export const ROUTES: RoutesProps = {
    HOME: {
        path: '/',
        title: 'Главная',
        component: Home,
        exact: true,
    },
    SIGNIN: {
        path: '/signin',
        title: 'Вход',
        component: Signin,
    },
    SIGNUP: {
        path: '/signup',
        title: 'Регистрация',
        component: Signup,
    },
    PROFILE: {
        path: '/profile',
        title: 'Профиль',
        component: Profile,
    },
    PROFILE_PASSWORD: {
        path: '/profile/password',
        title: 'Изменить пароль',
        component: Forum,
    },
    PROFILE_DATA: {
        path: '/profile/data',
        title: 'Изменить данные',
        component: Home,
    },
    FORUM: {
        path: '/forum',
        title: 'Форум',
        component: Forum,
    },
    GAME: {
        path: '/game',
        title: 'Игра',
        component: Game,
    },
    GAME_START: {
        path: '/game-start',
        title: 'Начать игру',
        component: GameStart,
    },
    LEADERBOARD: {
        path: '/leaderboard',
        title: 'Таблица лидеров',
        component: Leaderboard,
    },
    NOT_FOUND: {
        path: '/*',
        title: '404',
        component: ErrorPage,
    },

};
