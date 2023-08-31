export type User = {
    id: string
    username: string,
    email: string,
    password: string
}

export enum AuthTokenType{
    BEARER = 'Bearer'
}

export type AuthToken ={
    accessToken: string,
    refreshToken: string,
    expiresIn: string,
    tokenType: AuthTokenType
}