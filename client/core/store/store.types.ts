import { CurrentUserInfoProps } from '../api';

export interface StoreGameProps {
    isOver: boolean
    score?: number
}

export interface StoreProps {
    loader: boolean
    game: StoreGameProps
    profile: CurrentUserInfoProps | null
}
