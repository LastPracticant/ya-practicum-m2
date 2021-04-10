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
    Settings,
} from 'client/pages';
import { ProfileEdit, ProfileEditPassword, ProfileForm } from 'client/pages/Profile/components';
import { LOCAL } from 'client/shared/consts';
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
        title: LOCAL.PAGES.HOME,
        component: Home,
        exact: true,
    },
    SIGNIN: {
        path: '/signin',
        title: LOCAL.PAGES.SIGNIN,
        component: Signin,
    },
    SIGNUP: {
        path: '/signup',
        title: LOCAL.PAGES.SIGNUP,
        component: Signup,
    },
    PROFILE: {
        path: '/profile',
        title: LOCAL.PAGES.PROFILE,
        component: Profile,
        children: {
            PASSWORD: {
                path: '/profile/password',
                title: LOCAL.PAGES.PROFILE_PASSWORD,
                component: ProfileEditPassword,
            },
            DATA: {
                path: '/profile/data',
                title: LOCAL.PAGES.PROFILE_DATA,
                component: ProfileEdit,
            },
            VIEW: {
                path: '/profile',
                title: LOCAL.PAGES.PROFILE,
                component: ProfileForm,
            },
        },
    },
    FORUM: {
        path: '/forum',
        title: LOCAL.PAGES.FORUM,
        component: Forum,
        children: {
            TOPIC: {
                path: '/forum/topic',
                params: '/:id',
                title: LOCAL.PAGES.TOPIC,
                component: ForumTopic,
            },
            BOARD: {
                path: '/forum',
                title: LOCAL.PAGES.FORUM,
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
        title: LOCAL.PAGES.GAME,
        component: Game,
    },
    GAME_START: {
        path: '/game-start',
        title: LOCAL.PAGES.GAME_START,
        component: GameStart,
    },
    LEADERBOARD: {
        path: '/leaderboard',
        title: LOCAL.PAGES.LEADERBOARD,
        component: Leaderboard,
    },
    SETTINGS: {
        path: '/settings',
        title: LOCAL.PAGES.SETTINGS,
        component: Settings,
    },
    NOT_FOUND: {
        path: '/*',
        title: '404',
        component: ErrorPage,
    },
};
