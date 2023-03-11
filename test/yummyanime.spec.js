const YummyAnimeParser = require("../engines/yummyanime");

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
        const data = await ymParser.parseAnime(animeUrl[0].route);
        expect(data);
    })
})


describe("Yummyanime getPlayer test", () => {
    it("Success", async () => {
        const data = await ymParser.autoParsePlayer("Атака титанов")

        expect(data);
    })
})

