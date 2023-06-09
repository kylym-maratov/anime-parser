"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const config_1 = __importDefault(require("./config"));
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
function formatSearchData(data) {
    const $ = cheerio_1.default.load(data);
    const animeList = [];
    $('.poster').each((i, el) => {
        var _a;
        let urls = (_a = $(el).attr('href')) === null || _a === void 0 ? void 0 : _a.split('/');
        let url = '/' + urls[urls.length - 1];
        let genre = $(el).find('.poster__meta').text();
        let rating = $(el).find('.poster__ra').text();
        animeList.push({
            title: $(el).find('.poster__title').text(),
            image: $(el).find('.poster__img > img').attr('data-src'),
            year: genre.split(',')[0],
            rating,
            url,
        });
    });
    return animeList;
}
function formatAnimeData(data) {
    const $ = cheerio_1.default.load(data);
    const animeGInfo = [];
    let description = '';
    $('.page__subcol-info > li').each((i, el) => {
        const text = $(el).text().split(':');
        animeGInfo.push(text[1].trimStart());
    });
    $('.page__text > p').each((i, el) => {
        description += $(el).text();
    });
    const anime = {
        source: config_1.default.host,
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
    };
    return anime;
}
function formatIframeUrl(data) {
    const $ = cheerio_1.default.load(data);
    const translates = [];
    $('.b-translator__item').each((i, el) => {
        translates.push({
            translateid: $(el).attr('data-this_translator'),
            translateName: $(el).text(),
        });
    });
    const iframeUrl = cheerio_1.default.load(data)('iframe').attr('src') || '';
    return {
        iframeUrl,
        translates,
    };
}
exports.default = {
    formatSearchData,
    formatIframeUrl,
    formatAnimeData,
};
