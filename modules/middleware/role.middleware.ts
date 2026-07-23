import { NextFunction } from "express"
import { AuthRequest } from "../types/auth.types"
import { AppError } from "../utils/error"

export const roleMiddleware=(role:string[])=>{
    return(req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!req.user){return next(new AppError("Unauthorized",401))}
        if(!role.includes(req.user.role)){return next(new AppError("forbidden",403))}
        next()
    }
}