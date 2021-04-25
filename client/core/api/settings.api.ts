import { UserModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { BaseAPI } from './base.api';

const ExpressSettingsAPI = new HTTP('/internal/settings');

export interface UpdateUserSettingsRequestProps extends Pick<UserModelProps, 'settings' | 'id'> {}

export class SettingsAPI extends BaseAPI {
    static getUserSettings(userId: number) {
        return ExpressSettingsAPI.get<{}, UserModelProps>(`/${userId}`);
    }

    static updateUserSettings(data: UpdateUserSettingsRequestProps) {
        return ExpressSettingsAPI.put<UpdateUserSettingsRequestProps, Response>('/', { data });
    }
}
