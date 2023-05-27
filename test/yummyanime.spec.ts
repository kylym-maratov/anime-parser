import YummyAnimeParser from '../lib/yummyanime'

const ymParser = new YummyAnimeParser()

describe('Yummyanime getAnimes test', () => {
    it('Success', async () => {
        const data = await ymParser.getAnimesByName('Атака титанов')
        expect(data)
    })
})
