import cheerio from "cheerio";

function formatAuthKey(data: any): string {
    const $ = cheerio.load(data);

    const pattern = /[^a-zа-яё0-9\s]/gi;

    const scriptData = $("script").get()[6].children[0].data.split("var")[3].split("=")[1];

    const authKey = scriptData.replace(pattern, "").replace(/ /g, "").replace("\n", "");

    return authKey;
}

function formatSearchData(data: any) {
    const $ = cheerio.load(data);
    const animeList: any[] = [];

    $(".poster").each((i, el) => {
        let urls: any = $(el).attr("href")?.split("/");
        let url = "/" + urls[urls.length - 1];

        animeList.push({
            title: $(el).find(".poster__title").text(),
            image: $(el).find(".poster__img > img").attr("data-src"),
            genre: $(el).find(".poster__meta").text(),
            url
        })
    })

    return animeList;
}

function formatPlayerUrl(data: any) {
    const $ = cheerio.load(data);
    const translates: any = [];

    $(".b-translator__item").each((i, el) => {
        translates.push({
            translateid: $(el).attr("data-this_translator"),
            translateName: $(el).text()
        })
    })

    const iframeUrl = cheerio.load(data)("iframe").attr("src");

    return {
        iframeUrl,
        translates
    }
}


export default {
    formatAuthKey,
    formatSearchData,
    formatPlayerUrl
}
