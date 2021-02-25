import { SnackBarDataProps } from 'client/shared/components';
import { CurrentUserInfoProps } from '../api';

export interface StoreGameProps {
    isOver?: boolean
    isPause?: boolean
    score?: number
    currentLevel?: number
}

export interface StoreSnackBarProps extends SnackBarDataProps {
    isVisible: boolean
}

export interface StoreProps {
    loader: boolean
    game: StoreGameProps
    profile: CurrentUserInfoProps | null
    auth: boolean,
    snackbar: StoreSnackBarProps
}
