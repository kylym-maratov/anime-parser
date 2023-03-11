const axios = require("axios");


class DataParser {
    constructor(host, routes, headers) {
        this._host = host;
        this.headers = headers;
        this.successCode = 200;
        this.routes = routes;
        this.failedMessage = `Request failed with`
    }

    async _getSerachData(query = "") {
        const response = await axios.default.request({
            url: this._host + this.routes.search + query, method: "POST"
        });

        if (response.status !== this.successCode) throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }

    async _getAnimeDetails(route) {
        const response = await axios.default.request({
            url: this._host + route, method: "GET"
        });

        if (response.status !== this.successCode) throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }

    async _getAnimePlayer(route, referer) {
        const headers = { ...this.headers, "referer": this._host + referer };

        const response = await axios.default.request({
            url: this._host + route, method: "GET", headers
        });

        if (response.status !== this.successCode) throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }
}


module.exports = DataParser;