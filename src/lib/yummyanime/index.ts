import DataParser from "./data-parser";
import config from "./config";
import formatter from "./formatter";
import { AnimeTypes } from "../types";

export default class YummyAnimeParser extends DataParser {
    constructor() {
        super(config.host, config.routes, config.headers);
    }

    private async parseSearch(query: string) {
        try {
            const data = await this._getSerachData(query);

            const formated = formatter.formatSearchData(data);

            return formated;
        } catch (e) {
            throw e;
        }
    }

    private async parsePlayer(url: string, referer: string) {
        try {
            const data = await this._getAnimePlayer(url, referer);

            const formated = formatter.formatPlayerData(data);

            return formated;
        } catch (e) {
            throw e;
        }
    }

    async parseAnimes(query: string): Promise<AnimeTypes[]> {
        try {
            const searchResult = await this.parseSearch(query);

            const aniParsePromises = searchResult.map((item) => {
                return new Promise((resolve) => {
                    this._getAnimeDetails(item.url).then((animeDetailsData) => {
                        const animeData =
                            formatter.formatAnimeData(animeDetailsData);

                        if (!animeData.sourcePlayer.includes("/engine/ajax"))
                            return resolve({ ...animeData, ...item });

                        this.parsePlayer(animeData.sourcePlayer, item.url).then(
                            (iframeUrl) => {
                                const fullAnimeData: AnimeTypes = {
                                    ...animeData,
                                    ...item,
                                    iframeUrl,
                                };
                                resolve(fullAnimeData);
                            }
                        );
                    });
                });
            });

            const animes: AnimeTypes[] | any[] = await Promise.all(
                aniParsePromises
            );

            if (!animes.length) throw new Error("Cannot find anime by query");

            return animes;
        } catch (e) {
            throw e;
        }
    }
}
