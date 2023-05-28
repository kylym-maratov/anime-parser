import express, { Request, Response } from 'express'
import { AnimeStarsParser, YummyAnimeParser } from '../src/lib/index'
import { Anime } from '../src/lib/types'

const app = express()
const engines = [new YummyAnimeParser(), new AnimeStarsParser()]
const DEV_PORT = 5001

app.get('/anime', async (req: Request, res: Response) => {
    const { query } = req.query

    let animeStore: Anime[] = []

    if (!query) return res.status(404).send('Not found')

    for (let engine of engines) {
        const animes = await engine.searchAnimesByName(query.toString(), 3)

        if (!animes.length) continue

        animeStore = animeStore.concat(animeStore, animes)
    }

    return res.json({ message: 'OK!', data: animeStore })
})

app.listen(DEV_PORT, () =>
    console.log(`Test server running on port: ${DEV_PORT}`)
)
