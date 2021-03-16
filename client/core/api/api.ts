import { METHOD } from './api.consts';

type HeadersType = {
    [key: string]: string
};

export type OptionsType<T = any> = {
    method: METHOD
    data?: T
    headers?: HeadersType
    responseFormat?: 'json' | 'text'
};

export type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;
export type ApiModeType = 'clientDirectly' | 'accrosExpress';

export interface ResponseProps<T> extends Omit<XMLHttpRequest, 'response'> {
    response: T
}

export const API_SERVER_HOST = 'https://ya-praktikum.tech';
export const API_EXPRESS_HOST = '';

export function queryStringify<T extends object>(data: T): string {
    if (!data) {
        return '';
    }

    const queryArr = Object.entries(data).map(([key, value]) => `${key}=${value}`);

    return `?${queryArr.join('&')}`;
}

export class HTTP {
    _path: string;

    constructor(path = '') {
        this._path = `${API_EXPRESS_HOST}/api/v2${path}`;
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

        const { method, data, responseFormat = 'json' } = options;
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
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response[responseFormat]();
            });
    }
}
