import {
    API_SERVER_HOST, METHOD, OptionsType, OptionsWithoutMethodType, queryStringify,
} from 'client/core/api';
import fetch, { Response } from 'node-fetch';

export class ExpressHTTP {
    _path: string;

    constructor(path = '') {
        this._path = `${API_SERVER_HOST}/api/v2${path}`;
    }

    get<Req>(url: string, options: OptionsWithoutMethodType = {}) {
        return this.request<Req>(url, { ...options, method: METHOD.GET });
    }

    post<Req>(url: string, options: OptionsWithoutMethodType = {}) {
        return this.request<Req>(url, { ...options, method: METHOD.POST });
    }

    put<Req>(url: string, options: OptionsWithoutMethodType = {}) {
        return this.request<Req>(url, { ...options, method: METHOD.PUT });
    }

    delete<Req>(url: string, options: OptionsWithoutMethodType = {}) {
        return this.request<Req>(url, { ...options, method: METHOD.DELETE });
    }

    request<Req>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<Response> {
        function serializeBody(method: METHOD, data: Req) {
            if (method === METHOD.GET) {
                return;
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
            body: serializeBody(method, data),
            headers: serializeHeader(options),
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response;
            });
    }
}
