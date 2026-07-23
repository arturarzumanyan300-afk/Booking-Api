import { Request,Response,NextFunction } from "express";
import { AuthRequest, AuthUser } from "../types/auth.types";
import { AppError } from "../utils/error";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const header=req.headers.authorization
    if(!header){throw new AppError("No token",401)}
    const token=header.split(" ")[1]
    if(!token){throw new AppError("Invalid token",401)}
    const decoded=verifyAccessToken(token) as AuthUser
    (req as AuthRequest).user=decoded
    next()


}