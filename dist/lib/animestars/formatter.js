"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
function formatAuthKey(data) {
    const $ = cheerio_1.default.load(data);
    const pattern = /[^a-zа-яё0-9\s]/gi;
    const scriptData = $("script").get()[6].children[0].data.split("var")[3].split("=")[1];
    const authKey = scriptData.replace(pattern, "").replace(/ /g, "").replace("\n", "");
    return authKey;
}
function formatSearchData(data) {
    const $ = cheerio_1.default.load(data);
    const animeList = [];
    $(".poster").each((i, el) => {
        var _a;
        let urls = (_a = $(el).attr("href")) === null || _a === void 0 ? void 0 : _a.split("/");
        let url = "/" + urls[urls.length - 1];
        animeList.push({
            title: $(el).find(".poster__title").text(),
            image: $(el).find(".poster__img > img").attr("data-src"),
            genre: $(el).find(".poster__meta").text(),
            url
        });
    });
    return animeList;
}
function formatPlayerUrl(data) {
    const $ = cheerio_1.default.load(data);
    const translates = [];
    $(".b-translator__item").each((i, el) => {
        translates.push({
            translateid: $(el).attr("data-this_translator"),
            translateName: $(el).text()
        });
    });
    const iframeUrl = cheerio_1.default.load(data)("iframe").attr("src");
    return {
        iframeUrl,
        translates
    };
}
exports.default = {
    formatAuthKey,
    formatSearchData,
    formatPlayerUrl
};
