import * as JWT from 'jsonwebtoken'
import { AuthToken, AuthTokenType } from "../types";

    const createAuthToken = (userId: String): AuthToken => {
        try{
            const accessToken = JWT.sign({id: userId}, String(process.env.ACCESS_SECRET), {expiresIn: process.env.ACCESS_EXPIRATION})
            const refreshToken = JWT.sign({id: userId}, String(process.env.REFRESH_SECRET), {expiresIn: process.env.REFRESH_EXPIRATION})
            return {
                accessToken,
                refreshToken,
                expiresIn: String(process.env.ACCESS_EXPIRATION),
                tokenType: AuthTokenType.BEARER
            }
        } catch (e: any){
            throw new Error(e.message)
        }
    }


export default createAuthToken