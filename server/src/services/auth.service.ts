import * as JWT from 'jsonwebtoken'
import { User, AuthToken, AuthTokenType } from "../types";

class AuthService{

    createAuthToken(user: User): AuthToken {
        try{
            const accessToken = JWT.sign(user, String(process.env.ACCESS_SECRET), {expiresIn: process.env.ACCESS_EXPIRATION})
            const refreshToken = JWT.sign(user, String(process.env.REFRESH_SECRET), {expiresIn: process.env.REFRESH_EXPIRATION})
            return {
                accessToken,
                refreshToken,
                expiresIn: Number(process.env.ACCESS_EXPIRATION),
                tokenType: AuthTokenType.BEARER
            }
        } catch (e: any){
            throw new Error(e.message)
        }
    }

}

export default new AuthService