import { http } from "@tauri-apps/api";
import { BASE_URL } from "./CONST";
type IResponse<T> = http.Response<T>;

class Ask {
    constructor(_config: any) {}

    interceptors = {
        baseURL: BASE_URL,
        request: {
            headers: {},
            body: {},
            use: () => {},
        },
        response: (response: IResponse<any>) => response.data,
    };

    post = (url: string, data: Uint8Array) => {
        return new Promise((resolve) => {
            const requestBody = data;
            const requestHeaders = { ...this.interceptors.request.headers };
            this.interceptors.request.use();
            http.fetch<Uint8Array>(this.interceptors.baseURL + url, {
                headers: requestHeaders,
                method: "POST",
                body: http.Body.bytes(requestBody),
            }).then((res) => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res));
            });
        });
    };
    get = (url: string, data: any) => {
        return new Promise((resolve) => {
            console.log(http.Body.bytes(data), this.interceptors.baseURL + url);
            // const requestQuery = { ...data, ...this.interceptors.request.body };
            const requestHeaders = { ...this.interceptors.request.headers };
            this.interceptors.request.use();
            http.fetch(this.interceptors.baseURL + url, {
                headers: requestHeaders,
                method: "GET",
                query: {},
            }).then((res) => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res));
            });
        });
    };
}

const Http = new Ask({});

export const GET = Http.get;
export const POST = Http.post;
export default Http;
