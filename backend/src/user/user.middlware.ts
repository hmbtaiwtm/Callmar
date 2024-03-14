import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { userId } from "src/types/user";
import * as jwt from 'jsonwebtoken'

@Injectable()
export  class LoggerMiddleware implements NestMiddleware {
    use(req: userId, res: Response, next: NextFunction) {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '') 
        try {
            if(token) {
                const decoded: jwt.JwtPayload | string = jwt.verify(token, 'secret123')
                if(typeof decoded !== "string") {
                    req.userId = decoded.id
                }
            }
            next()
        } catch(error) {
            console.log(error)
            return res.status(403).json({
                message: 'нет доступа' 
            })
        }
    }
}