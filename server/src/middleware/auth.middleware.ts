import * as JWT from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const isAuthenticated = (req: any, res: Response, next: NextFunction): NextFunction | void => {
    try {
        let token;
        const headers = String(req.headers.authentication)
        if(headers && headers.startsWith('Bearer')){
        token = headers.split(' ')[1]
        if(!token) res.status(400).json('Login first.')
        const decoded: any = JWT.verify(token, String(process.env.ACCESS_SECRET))
        req.user = decoded.user
        next()
    }
    } catch (e: any){
        res.status(400).json(e.message)
    }
    
}

export default isAuthenticated