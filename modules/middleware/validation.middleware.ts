import { success,ZodSchema } from "zod";
import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/error";


export const validationMiddleware=(schema:ZodSchema)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
 const errors=schema.safeParse(req.body)
 if(!errors.success){return res.status(400).json({
    success:false,
    errors:errors.error.issues})}
    req.body=errors.data
    next()
 }

}
