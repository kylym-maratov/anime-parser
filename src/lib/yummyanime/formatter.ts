import cheerio from "cheerio";
import { AnimeTypes } from "./types";

function formatSearchData(data: any): AnimeTypes[] {
    const $ = cheerio.load(data);
    const animeList: AnimeTypes[] = [];

    $(".movie-item").each((i, el) => {
        let animeItem = $(el).find(".movie-item__link").attr("href");
        let urls: string[] | string = animeItem ? animeItem.split("/") : "";

        animeList.push({
            title: $(el).find(".movie-item__title").text(),
            url: "/" + urls[urls.length - 1],
            year: $(el).find(".movie-item__meta > span").text().replace(/[{()}]/g, ""),
            image: $(el).find(".movie-item__img > img").attr("src"),
            rating: $(el).find(".movie-item__rating").text().replace(/ /g, "")
        })
    })

    return animeList;
}

function formatAnimeData(data: any): string | undefined {
    const $ = cheerio.load(data);

    const iframe = $(".tabs-block__content > iframe").attr("src");

    return iframe;
}


function formatPlayerData(data: any): string | undefined {
    const $ = cheerio.load(data);

    const player = $("iframe").attr("src")

    return player;
}


export default { formatAnimeData, formatPlayerData, formatSearchData };