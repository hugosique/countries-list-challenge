export interface ICountry {
    name: string
    population: number
    region: string
    capital: string
    flags: IFlag
    nativeName?: {
        common: string
        official: string
    }
    subregion?: string
    topLevelDomain?: string
    currencies?: string
    languages?: string
    borders?: string[]
}

export interface IFlag {
    src: string
    alt: string
}