import { SnackBarDataProps } from 'client/shared/components';
import { RouterState } from 'connected-react-router';
import { CommentModelProps, TopicModelProps } from 'server/models/models.types';
import { CurrentUserInfoProps } from '../api';

export interface StoreGameProps {
    isOver?: boolean
    isPause?: boolean
    score?: number
    currentLevel?: number
}

export interface StoreForumProps {
    topics?: TopicModelProps[]
    comments?: CommentModelProps[]
}

export interface StoreSnackBarProps extends SnackBarDataProps {
    isVisible: boolean
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
}
