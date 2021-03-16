import { HTTP } from './api';
import { BaseAPI } from './base.api';

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
    static change(data: ChangeProfileProps) {
        return profileAPIInstance.put<ChangeProfileProps, ChangeProfileProps>('/profile', { data });
    }

    static changeAvatar(data: FormData) {
        return profileAPIInstance.put<ChangeProfilePropsAvatar, Response>('/profile/avatar', { data });
    }

    static changePassword(data: ChangePasswordProps) {
        return profileAPIInstance.put<ChangePasswordProps, Response>('/password', { data, responseFormat: 'text' });
    }
}
