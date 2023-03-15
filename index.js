const express = require("express");
const { YummyAnimeParser, AnimeStarsParser } = require("./dist/index");


const app = express();
const ymParser = new YummyAnimeParser();
const anistarParser = new AnimeStarsParser();

app.get("/yummy/search", async (req, res) => {
    const { query } = req.query;

    try {
        const animes = await ymParser.parseAnimes(query);

        res.json(animes);
    } catch (e) {
        console.log(e);
        res.end(e.message);
    }
})

app.get("/stars/search", async (req, res) => {
    const { query } = req.query;

    try {
        const animes = await anistarParser.parseSearch(query);

        res.json(animes);
    } catch (e) {
        console.log(e);
        res.end(e.message);
    }
})

app.get("/stars/watch/:url", async (req, res) => {
    const { url } = req.params;

    try {
        const iframe = await anistarParser.parsePlayer(url)

        console.log(iframe);

        res.end(
            `<iframe src="${iframe.iframeUrl}" allowFullScreen height="600px" width="600px"></iframe>`
        )
    } catch (e) {
        console.log(e);
        res.end(e.message);
    }
})

app.get("/yummy/watch/:url", async (req, res) => {
    const { url } = req.params;

    try {
        const iframe = await ymParser.parsePlayer(url);

        res.end(
            `<iframe src="${iframe}" allowFullScreen height="600px" width="600px"></iframe>`
        )
    } catch (e) {
        console.log(e);
        res.end(e.message);
    }
});



app.listen(3000);