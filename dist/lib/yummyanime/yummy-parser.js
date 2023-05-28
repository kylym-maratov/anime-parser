"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_parser_1 = __importDefault(require("./data-parser"));
const config_1 = __importDefault(require("./config"));
const formatter_1 = __importDefault(require("./formatter"));
class YummyAnimeParser extends data_parser_1.default {
    constructor() {
        super(config_1.default.host, config_1.default.routes, config_1.default.headers);
    }
    searchSeveralAnime(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._getSerachData(query);
            const formated = formatter_1.default.formatSearchData(data);
            return formated;
        });
    }
    getAnimeIframe(url, referer) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._getAnimePlayer(url, referer);
            const formated = formatter_1.default.formatPlayerData(data);
            return formated;
        });
    }
    searchAnimeByName(query, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResult = yield this.searchSeveralAnime(query);
            const animeDetailsData = yield this._getAnimeDetails(searchResult[0].url);
            const formatedAnime = formatter_1.default.formatAnimeData(animeDetailsData);
            if (!formatedAnime.player.includes('/engine/ajax')) {
                return Object.assign(Object.assign({}, formatedAnime), searchResult[0]);
            }
            const fullAnimeData = formatter_1.default.formatPlayerData(yield this.getAnimeIframe(formatedAnime.player, searchResult[0].url));
            return fullAnimeData;
        });
    }
    searchAnimesByName(query, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResult = yield this.searchSeveralAnime(query);
            if (limit)
                searchResult.length = limit;
            const aniParsePromises = searchResult.map((item) => {
                return new Promise((resolve) => {
                    this._getAnimeDetails(item.url).then((animeDetailsData) => {
                        const animeData = formatter_1.default.formatAnimeData(animeDetailsData);
                        if (!animeData.player.includes('/engine/ajax'))
                            return resolve(Object.assign(Object.assign({}, animeData), item));
                        this.getAnimeIframe(animeData.player, item.url).then((iframeUrl) => {
                            const fullAnimeData = Object.assign(Object.assign(Object.assign({}, animeData), item), { iframeUrl });
                            resolve(fullAnimeData);
                        });
                    });
                });
            });
            const animes = yield Promise.all(aniParsePromises);
            return animes.filter((item) => item !== null);
        });
    }
}
exports.default = YummyAnimeParser;
