"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
function formatSearchData(data) {
    const $ = cheerio_1.default.load(data);
    const animeList = [];
    $(".movie-item").each((i, el) => {
        let animeItem = $(el).find(".movie-item__link").attr("href");
        let urls = animeItem ? animeItem.split("/") : "";
        animeList.push({
            title: $(el).find(".movie-item__title").text(),
            url: "/" + urls[urls.length - 1],
            year: $(el)
                .find(".movie-item__meta > span")
                .text()
                .replace(/[{()}]/g, ""),
            image: $(el).find(".movie-item__img > img").attr("src"),
            rating: $(el).find(".movie-item__rating").text().replace(/ /g, ""),
        });
    });
    return animeList;
}
function formatAnimeData(data) {
    const $ = cheerio_1.default.load(data);
    const player = $(".tabs-block__content > iframe").attr("src");
    const animeGInfo = [];
    $(".inner-page__list > li").each((i, el) => {
        const text = $(el).text().split(":");
        animeGInfo.push(text[1].trimStart());
    });
    const anime = {
        title: $(".inner-page__main").find(".inner-page__title > h1").text(),
        originalName: $(".inner-page__subtitle").text(),
        time: animeGInfo[1],
        director: animeGInfo[2],
        genre: animeGInfo[4],
        status: animeGInfo[6],
        license: animeGInfo[7],
        translates: animeGInfo[8] ? animeGInfo[8] : animeGInfo[7],
        description: $(".inner-page__desc")
            .children(".inner-page__text")
            .text(),
        sourcePlayer: player || "",
    };
    return anime;
}
function formatPlayerData(data) {
    const $ = cheerio_1.default.load(data);
    const iframeUrl = $("iframe").attr("src");
    return iframeUrl ? iframeUrl : "";
}
exports.default = { formatAnimeData, formatPlayerData, formatSearchData };
