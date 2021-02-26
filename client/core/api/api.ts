import { METHOD } from './api.consts';

type HeadersType = {
    [key: string]: string
};

type OptionsType = {
    method: METHOD
    data?: any
    headers?: HeadersType
    responseFormat?: 'json' | 'text'
};

type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;

export interface ResponseProps<T> extends Omit<XMLHttpRequest, 'response'> {
    response: T
}

export const API_HOST = 'https://ya-praktikum.tech';
export const API_BASE_PATH = `${API_HOST}/api/v2`;

export function queryStringify<T extends object>(data: T): string {
    if (!data) {
        return '';
    }

    const queryArr = Object.entries(data).map(([key, value]) => `${key}=${value}`);

    return `?${queryArr.join('&')}`;
}

export class HTTP {
    _path: string = API_BASE_PATH;

    constructor(path = '') {
        this._path += path;
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

        function serializeHeader(method: METHOD, data: T) {
            if (method === METHOD.GET) {
                return;
            }
            if (data instanceof FormData) {
                return;
            }
            return {
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
            headers: serializeHeader(method, data),
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response[responseFormat]();
            });
    }
}
