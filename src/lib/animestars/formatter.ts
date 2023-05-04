import cheerio from 'cheerio'

import { SearchAnime, AnimeInfo } from '../anime.interface'

import config from './config'

// function formatAuthKey(data: any): string {
//     const $ = cheerio.load(data)

//     const pattern = /[^a-zа-яё0-9\s]/gi

//     // const scriptData = $("script")
//     //     .get()[6]
//     //     .children[0].data.split("var")[3]
//     //     .split("=")[1];

//     // const authKey = scriptData
//     //     .replace(pattern, "")
//     //     .replace(/ /g, "")
//     //     .replace("\n", "");

//     return ''
// }

function formatSearchData(data: any): SearchAnime[] {
    const $ = cheerio.load(data)
    const animeList: any[] = []

    $('.poster').each((i, el) => {
        let urls: any = $(el).attr('href')?.split('/')
        let url = '/' + urls[urls.length - 1]
        let genre = $(el).find('.poster__meta').text()
        let rating = $(el).find('.poster__ra').text()

        animeList.push({
            title: $(el).find('.poster__title').text(),
            image: $(el).find('.poster__img > img').attr('data-src'),
            year: genre.split(',')[0],
            rating,
            url,
        })
    })

    return animeList
}

function formatAnimeData(data: any): AnimeInfo {
    const $ = cheerio.load(data)
    const animeGInfo: string[] = []
    let description: string = ''

    $('.page__subcol-info > li').each((i, el) => {
        const text = $(el).text().split(':')

        animeGInfo.push(text[1].trimStart())
    })

    $('.page__text > p').each((i, el) => {
        description += $(el).text()
    })

    const anime: AnimeInfo = {
        source: config.host,
        title: $('.page__subcol-header > h1').text(),
        originalName: $('.page__subcol-header > div').text(),
        player: '',
        status: '',
        director: animeGInfo[2],
        translates: $('.fon-dob > ul > li').text().split(':')[1].trimStart(),
        description,
        genre: animeGInfo[3] ? animeGInfo[3].toString() : '',
        license: $('.pmovie__quality > div')
            .text()
            .split(' ')
            .splice(0, 2)
            .toString(),
    }

    return anime
}

function formatIframeUrl(data: any) {
    const $ = cheerio.load(data)
    const translates: any = []

    $('.b-translator__item').each((i, el) => {
        translates.push({
            translateid: $(el).attr('data-this_translator'),
            translateName: $(el).text(),
        })
    })

    const iframeUrl = cheerio.load(data)('iframe').attr('src') || ''

    return {
        iframeUrl,
        translates,
    }
}

export default {
    formatSearchData,
    formatIframeUrl,
    formatAnimeData,
}
