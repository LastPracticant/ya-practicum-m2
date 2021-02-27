export interface RoutesProps {
    [key: string]: RouteValueProps
}

export interface RouteValueProps {
    path: string
    title: string
}

export const ROUTES: RoutesProps = {
    LANDING: {
        path: '/',
        title: 'Лендинг',
    },
    HOME: {
        path: '/home',
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
    PROFILE_PASSWORD: {
        path: '/profile/password',
        title: 'Изменить пароль',
    },
    PROFILE_DATA: {
        path: '/profile/data',
        title: 'Изменить данные',
    },
    FORUM: {
        path: '/forum',
        title: 'Форум',
    },
    FORUM_TOPIC: {
        path: '/forum/topic',
        title: 'Форум: тема',
    },
    GAME: {
        path: '/game',
        title: 'Игра',
    },
    GAME_START: {
        path: '/game-start',
        title: 'Начать игру',
    },
    LEADERBOARD: {
        path: '/leaderboard',
        title: 'Таблица лидеров',
    },

};
