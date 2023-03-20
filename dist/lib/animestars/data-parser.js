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
        this.routes = routes;
        this.headers = headers;
        this.successCode = 200;
        this.failedMessage = "Server request failed status: ";
    }
    _getHost() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.request({
                url: this.host,
                method: "GET",
            })).data;
        });
    }
    _getSearchData(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: this.host + this.routes.search,
                data: formData,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data boundary=" + formData.get("_boundary"),
                },
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
    _getAnimeDetails(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: this.host + path,
                method: "GET",
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
    _getPlayer(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: this.host + this.routes.player,
                method: "POST",
                data: formData,
            });
            if (response.status !== this.successCode)
                throw Error(this.failedMessage + `${response.status} code`);
            return response.data;
        });
    }
}
exports.default = DataParser;
