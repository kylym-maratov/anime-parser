import axios from "axios";

export default class DataParser {
    private readonly host;
    private readonly headers;
    private readonly successCode;
    private readonly routes;
    private readonly failedMessage;

    constructor(host: string, routes: any, headers: any) {
        this.host = host;
        this.headers = headers;
        this.successCode = 200;
        this.routes = routes;
        this.failedMessage = `Request failed with`;
    }

    public async _getSerachData(query: string = "") {
        const response = await axios.request({
            url: this.host + this.routes.search + query,
            method: "POST",
        });

        if (response.status !== this.successCode)
            throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }

    public async _getAnimeDetails(path: string) {
        const response = await axios.request({
            url: this.host + path,
            method: "GET",
        });

        if (response.status !== this.successCode)
            throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }

    public async _getAnimePlayer(path: string, referer: string) {
        const headers = { ...this.headers, referer: this.host + referer };

        const response = await axios.request({
            url: this.host + path,
            method: "GET",
            headers,
        });

        if (response.status !== this.successCode)
            throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }
}
