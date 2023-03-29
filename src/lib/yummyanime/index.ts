import DataParser from './data-parser'
import config from './config'
import formatter from './formatter'
import { Anime } from '../types'

export default class YummyAnimeParser extends DataParser {
    constructor() {
        super(config.host, config.routes, config.headers)
    }

    private async searchSeveralAnime(query: string) {
        try {
            const data = await this._getSerachData(query)

            const formated = formatter.formatSearchData(data)

            return formated
        } catch (e) {
            throw e
        }
    }

    private async getAnimeIframe(url: string, referer: string) {
        try {
            const data = await this._getAnimePlayer(url, referer)

            const formated = formatter.formatPlayerData(data)

            return formated
        } catch (e) {
            throw e
        }
    }

    async getAnimesByName(
        query: string,
        limit: number | null = null
    ): Promise<Anime[]> {
        try {
            const searchResult = await this.searchSeveralAnime(query)

            if (limit) searchResult.length = limit

            const aniParsePromises = searchResult.map((item) => {
                return new Promise((resolve) => {
                    this._getAnimeDetails(item.url).then((animeDetailsData) => {
                        const animeData =
                            formatter.formatAnimeData(animeDetailsData)

                        if (!animeData.player.includes('/engine/ajax'))
                            return resolve({ ...animeData, ...item })

                        this.getAnimeIframe(animeData.player, item.url).then(
                            (iframeUrl) => {
                                const fullAnimeData = {
                                    ...animeData,
                                    ...item,
                                    iframeUrl,
                                }
                                resolve(fullAnimeData)
                            }
                        )
                    })
                })
            })

            const animes: Anime[] | any[] = await Promise.all(aniParsePromises)

            if (!animes.length) throw new Error('Cannot find anime by query')

            return animes.filter((item) => item !== null)
        } catch (e) {
            throw e
        }
    }
}
