import { HTTP } from './api';
import { BaseAPI } from './base.api';
import { CurrentUserInfoProps } from './auth.api';

export interface ChangeProfileProps {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
}

export interface ChangeProfilePropsAvatar {
    file: FormData
}

export interface ChangePasswordProps {
    oldPassword: string
    newPassword: string
}

const profileAPIInstance = new HTTP('/user');

export class ProfileAPI extends BaseAPI {
    static change<T = ChangeProfileProps>(data: T): Promise<CurrentUserInfoProps> {
        return profileAPIInstance.put<CurrentUserInfoProps>('/profile', { data });
    }

    static changeAvatar(data: FormData): Promise<CurrentUserInfoProps> {
        return profileAPIInstance.put<CurrentUserInfoProps>('/profile/avatar', { data });
    }

    static changePassword<T = ChangePasswordProps>(data: T): Promise<T> {
        return profileAPIInstance.put<T>('/password', { data, responseFormat: 'text' });
    }
}
