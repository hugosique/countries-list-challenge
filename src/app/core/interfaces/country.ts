export interface ICountry {
    name: string
    population: number
    region: string
    capital: string
    flags: IFlag
}

export interface IFlag {
    src: string
    alt: string
}