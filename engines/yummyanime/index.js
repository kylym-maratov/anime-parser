const DataParser = require("../data-parser");
const config = require("./config");
const formatter = require("./formatter");

class YummyAnimeParser extends DataParser {
    constructor() {
        super(
            config.host,
            config.routes,
            {
                "sec-fetch-site": "same-origin"
            })
    }

    async parseSearch(query) {
        try {
            const data = await this._getSerachData(query);

            const formated = formatter.formatSearchData(data);

            return formated;
        } catch (e) {
            throw e;
        }
    }

    async parseAnime(animeRoute) {
        try {
            const data = await this._getAnimeDetails(animeRoute);

            const formated = formatter.formatAnimeData(data);

            return formated;

        } catch (e) {
            throw e;
        }
    }

    async parsePlayer(route, referer) {
        try {
            const data = await this._getAnimePlayer(route, referer);

            const formated = formatter.formatPlayerData(data);

            return formated;

        } catch (e) {
            throw e;
        }
    }

    async autoParsePlayer(query) {
        try {
            const searchResult = await this.parseSearch(query)
            const animeResult = await this.parseAnime(searchResult[0].route);
            const playerResult = await this.parsePlayer(searchResult[0].route, animeResult);

            return playerResult;
        } catch (e) {
            throw e;
        }
    }
}


module.exports = YummyAnimeParser;