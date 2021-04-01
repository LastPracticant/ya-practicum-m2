import {
    Forum,
    Game,
    Leaderboard,
    Profile,
    Signin,
    Signup,
    Home,
    GameStart,
    ForumTopic,
    ForumBoard,
    ErrorPage,
} from 'client/pages';
import { ProfileEdit, ProfileEditPassword, ProfileForm } from 'client/pages/Profile/components';
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
    children?: RoutesProps
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
        children: {
            PASSWORD: {
                path: '/profile/password',
                title: 'Изменение пароля',
                component: ProfileEditPassword,
            },
            DATA: {
                path: '/profile/data',
                title: 'Изменение данных',
                component: ProfileEdit,
            },
            VIEW: {
                path: '/profile',
                title: 'Профиль',
                component: ProfileForm,
            },
        },
    },
    FORUM: {
        path: '/forum',
        title: 'Форум',
        component: Forum,
        children: {
            TOPIC: {
                path: '/forum/topic',
                params: '/:id',
                title: 'Форум: тема',
                component: ForumTopic,
            },
            BOARD: {
                path: '/forum',
                title: 'Форум',
                component: ForumBoard,
            },
            NOT_FOUND: {
                path: '/*',
                title: '404',
                component: ErrorPage,
            },
        },
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
