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

const ExpresspPofileAPI = new HTTP('/user');

export class ProfileAPI extends BaseAPI {
    static change(data: ChangeProfileProps) {
        return ExpresspPofileAPI.put<ChangeProfileProps, ChangeProfileProps>('/profile', { data });
    }

    static changeAvatar(data: FormData) {
        return ExpresspPofileAPI.put<ChangeProfilePropsAvatar, Response>('/profile/avatar', { data });
    }

    static changePassword(data: ChangePasswordProps) {
        return ExpresspPofileAPI.put<ChangePasswordProps, Response>('/password', { data, responseFormat: 'text' });
    }
}
