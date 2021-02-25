import { CurrentUserInfoProps } from '../api';

export interface StoreProps {
    loader: boolean
    profile: CurrentUserInfoProps | null
}
