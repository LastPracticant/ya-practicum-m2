export interface RoutesProps {
    [key: string]: RouteValueProps
}

export interface RouteValueProps {
    path: string
    title: string
}

export const ROUTES: RoutesProps = {
    HOME: {
        path: '/',
        title: 'Главная',
    },
    SIGNIN: {
        path: '/signin',
        title: 'Вход',
    },
    SIGNUP: {
        path: '/signup',
        title: 'Регистрация',
    },
    PROFILE: {
        path: '/profile',
        title: 'Профиль',
    },
    FORUM: {
        path: '/forum',
        title: 'Форум',
    },
    GAME: {
        path: '/game',
        title: 'Игра',
    },
    LEADERBOARD: {
        path: '/leaderboard',
        title: 'Таблица лидеров',
    },
};
