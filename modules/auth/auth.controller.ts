import { Request,Response,NextFunction } from "express"
import { AuthRequest } from "../types/auth.types"
import * as authService from "./auth.service"
import {queue} from "../../queues/queue"
export const register=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const user=await authService.register(req.body)
              await queue.add("sendEmail",{email:user.email})
        return res.status(201).json(user)
    }catch(err){
        next(err)
    }
}
export const login=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const user=await authService.login(req.body)
        return res.json(user)
    }catch(err){
        next(err)
    }
}
export const refresh=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const user=await authService.refresh(req.body.refreshToken)
        return res.json(user)
    }catch(err){
        next(err)
    }
}
export const logout=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const user=await authService.logout(req.body.refreshToken)
        return res.json(user)
    }catch(err){
        next(err)
    }
}