import DataParser from './data-parser'
import config from './config'
import formatter from './formatter'
import { Anime } from '../types'

export default class YummyAnimeParser extends DataParser {
    constructor() {
        super(config.host, config.routes, config.headers)
    }

    private async searchSeveralAnime(query: string) {
        const data = await this._getSerachData(query)

        const formated = formatter.formatSearchData(data)

        return formated
    }

    private async getAnimeIframe(url: string, referer: string) {
        const data = await this._getAnimePlayer(url, referer)

        const formated = formatter.formatPlayerData(data)

        return formated
    }

    async searchAnimeByName(query: string, limit: number | null = null) {
        if (!query.length) throw new Error('Query cannot be empty')

        const searchResult = await this.searchSeveralAnime(query)

        const animeDetailsData = await this._getAnimeDetails(
            searchResult[0].url
        )

        const formatedAnime = formatter.formatAnimeData(animeDetailsData)

        if (!formatedAnime.player.includes('/engine/ajax')) {
            return { ...formatedAnime, ...searchResult[0] }
        }

        const fullAnimeData = formatter.formatPlayerData(
            await this.getAnimeIframe(formatedAnime.player, searchResult[0].url)
        )

        return fullAnimeData
    }

    async searchAnimesByName(
        query: string,
        limit: number | null = null
    ): Promise<Anime[]> {
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

        return animes.filter((item) => item !== null)
    }
}
