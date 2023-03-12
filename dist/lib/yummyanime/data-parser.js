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
const axios_1 = __importDefault(require("axios"));
class DataParser {
    constructor(host, routes, headers) {
        this.host = host;
        this.headers = headers;
        this.successCode = 200;
        this.routes = routes;
        this.failedMessage = `Request failed with`;
    }
    _getSerachData(query = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: this.host + this.routes.search + query, method: "POST"
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
    _getAnimeDetails(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: this.host + route, method: "GET"
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
    _getAnimePlayer(route, referer) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = Object.assign(Object.assign({}, this.headers), { "referer": this.host + referer });
            const response = yield axios_1.default.request({
                url: this.host + route, method: "GET", headers
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
}
exports.default = DataParser;
