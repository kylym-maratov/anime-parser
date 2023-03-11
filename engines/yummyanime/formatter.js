const cheerio = require("cheerio");

function formatSearchData(data) {
    const $ = cheerio.load(data);
    const animeList = [];

    $(".movie-item").each((i, el) => {
        let url = $(el).find(".movie-item__link").attr("href").split("/");

        animeList.push({
            title: $(el).find(".movie-item__title").text(),
            route: "/" + url[url.length - 1],
            year: $(el).find(".movie-item__meta > span").text().replace(/[{()}]/g, ""),
            imageUrl: $(el).find(".movie-item__img > img").attr("src"),
            animeRating: $(el).find(".movie-item__rating").text().replace(/ /g, "")
        })
    })

    return animeList;
}

function formatAnimeData(data) {
    const $ = cheerio.load(data);

    const iframe = $(".tabs-block__content > iframe").attr("src");

    return iframe;
}


function formatPlayerData(data) {
    const $ = cheerio.load(data);

    const player = $("iframe").attr("src")

    return player;
}

module.exports = { formatAnimeData, formatSearchData, formatPlayerData };