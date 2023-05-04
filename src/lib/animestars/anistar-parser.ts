import DataParser from './data-parser'
import config from './config'
import formatter from './formatter'
import { Anime } from '../anime.interface'

export default class AnimeStarsParser extends DataParser {
    constructor() {
        super(config.host, config.routes, config.headers)
    }

    // private async getAuthKey() {
    //     try {
    //         const hostData = await this._getHost()
    //         const authKey = formatter.formatAuthKey(hostData)

    //         return authKey
    //     } catch (e) {
    //         throw e
    //     }
    // }

    private async searchSeveralAnime(query: string) {
        const formData = new FormData()
        formData.append('story', query)
        formData.append('subaction', 'search')

        const data = await this._getSearchData(formData)
        const formated = formatter.formatSearchData(data)

        return formated
    }

    private async getAnimeIframe(url: string) {
        let news_id = url.split('-')[0].replace('/', '')

        const formData = new FormData()

        formData.append('news_id', news_id)
        formData.append('action', 'load_player')

        const iframeData = await this._getPlayer(formData)

        const iframe = formatter.formatIframeUrl(iframeData)

        return iframe
    }

    async getAnimesByName(
        query: string,
        limit: number | null = null
    ): Promise<Anime[]> {
        const searchResult = await this.searchSeveralAnime(query)

        if (limit) searchResult.length = limit

        const animePromiseWrapper = searchResult.map((item, i) => {
            return new Promise((resolve) => {
                this._getAnimeDetails(item.url).then((data) => {
                    const animeData = formatter.formatAnimeData(data)

                    this.getAnimeIframe(item.url).then((player) => {
                        const fullAnimeData: Anime = {
                            ...item,
                            ...animeData,
                            iframeUrl: player.iframeUrl,
                            translatesIds: player.translates,
                        }
                        resolve(fullAnimeData)
                    })
                })
            })
        })

        const animes: Anime[] | any[] = await Promise.all(animePromiseWrapper)

        if (!animes.length) throw new Error('Cannot find animes by query')

        return animes.filter((item) => item !== null)
    }
}
