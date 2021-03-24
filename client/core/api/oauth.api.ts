import { HTTP } from './api';
import { BaseAPI } from './base.api';

export interface OAuthSigninProps {
    code: string
}

export interface TokenProps {
    service_id: number
}

const ExpressOAuthAPI = new HTTP('/oauth/yandex');

export class OAuthAPI extends BaseAPI {
    static signinWithYandex(data: OAuthSigninProps) {
        return ExpressOAuthAPI.post<OAuthSigninProps, Response>('', { data });
    }

    static getServiceId() {
        return ExpressOAuthAPI.get<{}, TokenProps>('/service-id');
    }
}
