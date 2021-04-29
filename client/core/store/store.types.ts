import { SnackBarDataProps } from 'client/shared/components';
import { RouterState } from 'connected-react-router';
import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import {
    CurrentUserInfoProps, GetAllResultsResponseProps,
} from '../api';

export interface StoreGameProps {
    isOver?: boolean
    isPause?: boolean
    score?: number
    currentLevel?: number
}

export interface LeaderboardProps {
    playersScores?: GetAllResultsResponseProps[]
    currentPlayerScore?: GetAllResultsResponseProps
}

export interface StoreForumProps {
    topics?: TopicModelProps[]
    currentTopic?: TopicModelProps
    comments?: CommentModelProps[]
}

export interface StoreSnackBarProps extends SnackBarDataProps {
    isVisible: boolean
}

export interface UserSettingsProps {
    isColorThemeLight?: boolean
    isMusicEnabled?: boolean
    musicTheme?: 'intro' | 'game'
}

export interface StoreProps {
    router: RouterState
    loader: boolean
    game: StoreGameProps
    profile: CurrentUserInfoProps
    auth: boolean | null
    oauth: number | null
    snackbar: StoreSnackBarProps
    forum: StoreForumProps
    leaderboard: LeaderboardProps
    userSettings: UserSettingsProps
}
