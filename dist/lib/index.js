"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YummyAnimeParser = exports.AnimeStarsParser = void 0;
const anistar_parser_1 = __importDefault(require("./animestars/anistar-parser"));
exports.AnimeStarsParser = anistar_parser_1.default;
const yummy_parser_1 = __importDefault(require("./yummyanime/yummy-parser"));
exports.YummyAnimeParser = yummy_parser_1.default;
