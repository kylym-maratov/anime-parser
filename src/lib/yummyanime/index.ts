import DataParser from "./data-parser";
import config from "./config";
import formatter from "./formatter";

export default class YummyAnimeParser extends DataParser {
    constructor() {
        super(
            config.host,
            config.routes,
            {
                "sec-fetch-site": "same-origin"
            })
    }

    async parseSearch(query: string) {
        try {
            const data = await this._getSerachData(query);

            const formated = formatter.formatSearchData(data);

            return formated;
        } catch (e) {
            throw e;
        }
    }

    async parseAnime(animeRoute: string) {
        try {
            const data = await this._getAnimeDetails(animeRoute);

            const formated = formatter.formatAnimeData(data);

            return formated;

        } catch (e) {
            throw e;
        }
    }

    async parsePlayer(route: string, referer: string) {
        try {
            const data = await this._getAnimePlayer(route, referer);

            const formated = formatter.formatPlayerData(data);

            return formated;

        } catch (e) {
            throw e;
        }
    }

    async autoParsePlayer(query: string) {
        try {
            const searchResult = await this.parseSearch(query)
            const animeResult = await this.parseAnime(searchResult[0].url);

            if (!animeResult) throw new Error("Cannot parse anime url");

            const playerResult = await this.parsePlayer(searchResult[0].url, animeResult);

            return playerResult;
        } catch (e) {
            throw e;
        }
    }
}


module.exports = YummyAnimeParser;