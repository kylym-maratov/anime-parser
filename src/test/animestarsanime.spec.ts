import AnimeStarsParser from "../lib/animestars"


const aniStarsParser = new AnimeStarsParser();

describe("AnimeStars search test", () => {
    it("Success", async () => {
        const data = await aniStarsParser.parseSearch("Атака титанов");

        expect(data);
    })
})