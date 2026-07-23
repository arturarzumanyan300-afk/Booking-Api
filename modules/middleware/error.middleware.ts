import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/error";

export const errorMiddleware=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof AppError){return res.status(err.status).json({message:err.message})}
next()
}