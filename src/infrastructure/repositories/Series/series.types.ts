export type SeriesCreateBody = {
    name: string
}

export type SeriesCreateResponse = {
    id: string
}

export type SeriesUpdateBody = {
    name: string
}

export type SeriesGetResponse = {
    id: string
    name: string
}