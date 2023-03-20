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
class AnimeStarsParser extends data_parser_1.default {
    constructor() {
        super(config_1.default.host, config_1.default.routes, config_1.default.headers);
    }
    parseAuthKey() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hostData = yield this._getHost();
                const authKey = formatter_1.default.formatAuthKey(hostData);
                return authKey;
            }
            catch (e) {
                throw e;
            }
        });
    }
    parseSearch(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authKey = yield this.parseAuthKey();
                const formData = new FormData();
                formData.append("story", query);
                formData.append("user_hash", authKey);
                formData.append("subaction", "search");
                const data = yield this._getSearchData(formData);
                const formated = formatter_1.default.formatSearchData(data);
                return formated;
            }
            catch (e) {
                throw e;
            }
        });
    }
    parsePlayer(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let news_id = url.split("-")[0].replace("/", "");
            const formData = new FormData();
            formData.append("news_id", news_id);
            formData.append("action", "load_player");
            const player = yield this._getPlayer(formData);
            const playerData = formatter_1.default.formatPlayerUrl(player);
            return playerData;
        });
    }
    parseAnimes(query, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchResult = yield this.parseSearch(query);
                if (limit)
                    searchResult.length = limit;
                const animePromises = searchResult.map((item, i) => {
                    return new Promise((resolve) => {
                        this._getAnimeDetails(item.url).then((data) => {
                            const animeData = formatter_1.default.formatAnimeData(data);
                            this.parsePlayer(item.url).then((player) => {
                                const fullAnimeData = Object.assign(Object.assign(Object.assign({}, item), animeData), { iframeUrl: player.iframeUrl });
                                resolve(fullAnimeData);
                            });
                        });
                    });
                });
                const animes = yield Promise.all(animePromises);
                if (!animes.length)
                    throw new Error("Cannot find animes by query");
                return animes;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = AnimeStarsParser;
