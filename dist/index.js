"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.YummyAnimeParser = exports.AnimeStarsParser = void 0;
const yummyanime_1 = __importDefault(require("./lib/yummyanime"));
exports.YummyAnimeParser = yummyanime_1.default;
const animestars_1 = __importDefault(require("./lib/animestars"));
exports.AnimeStarsParser = animestars_1.default;
