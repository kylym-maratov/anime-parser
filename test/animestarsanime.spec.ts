import AnimeStarsParser from '../lib/animestars'

const aniStarsParser = new AnimeStarsParser()

describe('AnimeStars parseAnimes test', () => {
    it('Success', async () => {
        const data = await aniStarsParser.getAnimesByName('Атака титанов')

        expect(data)
    })
})
