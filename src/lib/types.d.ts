export interface ShortAnimeTypes {
    title: string
    url: string
    year: string
    image?: string
    rating: string
}

export interface MiddleAnimeTypes {
    source: string
    title: string
    originalName: string
    time?: string
    sourcePlayer: string
    description: string
    genre: string
    license: string
    translates: string
    status: string
    director: string
}

export interface AnimeTypes {
    url: string
    year: string
    image?: string
    rating: string
    title: string
    originalName: string
    sourcePlayer: string
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
