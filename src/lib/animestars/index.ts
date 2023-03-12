import DataParser from "./data-parser"
import config from "./config";
import formatter from "./formatter";


export default class AnimeStarsParser extends DataParser {
    constructor() {
        super(
            config.host,
            config.routes,
            {}
        )
    }

    private async parseAuthKey() {
        try {
            const hostData = await this._getHost();
            const authKey = formatter.formatAuthKey(hostData);

            return authKey;
        } catch (e) {
            throw e;
        }
    }

    async parseSearch(query: string) {
        try {
            const authKey = await this.parseAuthKey();
            const formData = new FormData();
            formData.append("story", query);
            formData.append("user_hash", authKey);
            formData.append("subaction", "search")

            const data = await this._getSearchData(formData);
            const formated = formatter.formatSearchData(data);

            return formated;
        } catch (e) {
            throw e;
        }
    }

    async parsePlayer(url: string) {
        let news_id = url.split("-")[0].replace("/", "");

        const formData = new FormData();

        formData.append("news_id", news_id);
        formData.append("action", "load_player");

        const player = await this._getPlayer(formData);

        const playerData = formatter.formatPlayerUrl(player);

        return playerData;
    }
}
