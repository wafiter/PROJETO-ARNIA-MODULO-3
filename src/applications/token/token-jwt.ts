export interface TokenJwt { 
    generate (payload: any): string
}