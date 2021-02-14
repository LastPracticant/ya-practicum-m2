import { HTTP, ResponseProps } from './api';
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
    file: Blob
}

export interface ChangePasswordProps {
    oldPassword: string
    newPassword: string
}

const profileAPIInstance = new HTTP('/user');

export class ProfileAPI extends BaseAPI {
    static change<T = ChangeProfileProps>(data: T): Promise<ResponseProps<T>> {
        return profileAPIInstance.put<T>('/profile', { data });
    }

    static changeAvatar<T = FormData>(data: T): Promise<ResponseProps<T>> {
        return profileAPIInstance.put<T>('/profile/avatar', { data });
    }

    static changePassword<T = ChangePasswordProps>(data: T): Promise<ResponseProps<T>> {
        return profileAPIInstance.put<T>('/password', { data });
    }
}
