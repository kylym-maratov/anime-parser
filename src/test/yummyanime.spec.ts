import YummyAnimeParser from "../lib/yummyanime";

const ymParser = new YummyAnimeParser()

describe("Yummyanime search test", () => {
    it("Success", async () => {
        const data = await ymParser.parseSearch("Атака титанов")
        expect(data);
    })
})

describe("Yummyanime getAnime test", () => {
    it("Success", async () => {
        const animeUrl = await ymParser.parseSearch("Атака титанов")
        const data = await ymParser.parseAnime(animeUrl[0].url);
        expect(data);
    })
})


describe("Yummyanime getPlayer test", () => {
    it("Success", async () => {
        const data = await ymParser.autoParsePlayer("Атака титанов")

        expect(data);
    })
})

