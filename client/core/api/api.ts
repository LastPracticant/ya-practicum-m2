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

    _isBFF: boolean;

    constructor(path = '', mode: ApiModeType = 'clientDirectly', host = API_SERVER_HOST) {
        this._path = `${host}/api/v2${path}`;
        this._isBFF = mode === 'accrosExpress';
    }

    get<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.GET });
    }

    post<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.POST });
    }

    put<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.PUT });
    }

    delete<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.DELETE });
    }

    request<T>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<T> {
        function serializeBody(method: METHOD, data: T) {
            if (method === METHOD.GET) {
                return;
            }
            if (data instanceof FormData) {
                return data;
            }
            return JSON.stringify(data);
        }

        function serializeHeader({ data, method, headers }: OptionsType<T>) {
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
            .then(async (response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                if (this._isBFF) {
                    return response;
                }

                return response[responseFormat]();
            });
    }
}
