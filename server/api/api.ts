import {
    API_SERVER_HOST, METHOD, OptionsType, OptionsWithoutMethodType, queryStringify,
} from 'client/core/api';

export class ExpressHTTP {
    _path: string;

    constructor(path = '') {
        this._path = `${API_SERVER_HOST}/api/v2${path}`;
    }

    get<Req, Res>(url: string, options: OptionsWithoutMethodType = {}): Promise<Res> {
        return this.request<Req, Res>(url, { ...options, method: METHOD.GET });
    }

    post<Req, Res>(url: string, options: OptionsWithoutMethodType = {}): Promise<Res> {
        return this.request<Req, Res>(url, { ...options, method: METHOD.POST });
    }

    put<Req, Res>(url: string, options: OptionsWithoutMethodType = {}): Promise<Res> {
        return this.request<Req, Res>(url, { ...options, method: METHOD.PUT });
    }

    delete<Req, Res>(url: string, options: OptionsWithoutMethodType = {}): Promise<Res> {
        return this.request<Req, Res>(url, { ...options, method: METHOD.DELETE });
    }

    request<Req, Res>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<Res> {
        function serializeBody(method: METHOD, data: Req) {
            if (method === METHOD.GET) {
                return;
            }
            if (data instanceof FormData) {
                return data;
            }
            return JSON.stringify(data);
        }

        function serializeHeader({ data, method, headers }: OptionsType<Req>) {
            if (method === METHOD.GET || data instanceof FormData) {
                return headers;
            }

            return {
                ...headers,
                'Content-Type': 'application/json',
            };
        }

        const { method, data } = options;
        const basePath = `${this._path}${url}`;
        const path = method === METHOD.GET
            ? `${basePath}${queryStringify(data)}`
            : basePath;

        return fetch(path, {
            method,
            mode: 'cors',
            credentials: 'include',
            body: serializeBody(method, data),
            headers: serializeHeader(options),
        })
            .then((response) => response).catch((error) => error);
    }
}
