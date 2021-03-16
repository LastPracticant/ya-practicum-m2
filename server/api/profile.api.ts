import {
    BaseAPI,
    ChangePasswordProps, ChangeProfileProps, CurrentUserInfoProps, OptionsWithoutMethodType,
} from 'client/core/api';
import { ExpressHTTP } from './api';

const ServerProfileAPI = new ExpressHTTP('/user');

export class ExpressProfileAPI extends BaseAPI {
    static change(data: ChangeProfileProps, options: OptionsWithoutMethodType) {
        return ServerProfileAPI.put<ChangeProfileProps>('/profile', { ...options, data });
    }

    static changeAvatar(data: FormData, options: OptionsWithoutMethodType) {
        return ServerProfileAPI.put<CurrentUserInfoProps>('/profile/avatar', { ...options, data });
    }

    static changePassword(data: ChangePasswordProps, options: OptionsWithoutMethodType) {
        return ServerProfileAPI.put<ChangePasswordProps>('/password', { ...options, data, responseFormat: 'text' });
    }
}
