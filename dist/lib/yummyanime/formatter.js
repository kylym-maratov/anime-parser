"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
            year: $(el).find(".movie-item__meta > span").text().replace(/[{()}]/g, ""),
            image: $(el).find(".movie-item__img > img").attr("src"),
            rating: $(el).find(".movie-item__rating").text().replace(/ /g, "")
        });
    });
    return animeList;
}
function formatAnimeData(data) {
    const $ = cheerio_1.default.load(data);
    const iframe = $(".tabs-block__content > iframe").attr("src");
    return iframe;
}
function formatPlayerData(data) {
    const $ = cheerio_1.default.load(data);
    const player = $("iframe").attr("src");
    return player;
}
exports.default = { formatAnimeData, formatPlayerData, formatSearchData };
