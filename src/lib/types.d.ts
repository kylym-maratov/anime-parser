export interface SearchAnime {
    title: string
    url: string
    year: string
    image?: string
    rating: string
}

export interface AnimeInfo {
    source: string
    title: string
    originalName: string
    time?: string
    player: string
    description: string
    genre: string
    license: string
    translates: string
    status: string
    director: string
}

export interface Anime {
    url: string
    year: string
    image?: string
    rating: string
    title: string
    originalName: string
    player: string
    description: string
    genre: string
    license: string
    translates: string
    status: string
    director: string
    iframeUrl: string
    translatesIds?: {
        translateId: string
        trasnlateName: string
    }[]
}
