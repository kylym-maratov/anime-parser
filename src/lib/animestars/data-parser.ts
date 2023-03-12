import axios from "axios";


export default class DataParser {
    private readonly host;
    private readonly headers;
    private readonly successCode;
    private readonly routes;
    private readonly failedMessage;
    ;

    constructor(host: string, routes: any, headers: any) {
        this.host = host;
        this.routes = routes;
        this.headers = headers;
        this.successCode = 200;
        this.failedMessage = ""
    }

    public async _getHost() {
        return (await axios.request({
            url: this.host, method: "GET"
        })).data;
    }

    public async _getSearchData(formData: FormData) {
        const response = await axios.request({
            url: this.host + this.routes.search,
            data: formData,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data boundary=" + formData.get("_boundary")
            }
        });

        if (response.status !== this.successCode)
            throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }

    public async _getPlayer(formData: FormData) {
        const response = await axios.request({
            url: this.host + this.routes.player,
            method: "POST",
            data: formData
        })
        if (response.status !== this.successCode)
            throw Error(this.failedMessage + `${response.status} code`);

        return response.data;
    }
}