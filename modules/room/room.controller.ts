import {Request,Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.types"
import * as roomService from "./room.service"

export const createRoom=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
    const result=await roomService.createRoom(req.body,req.body.hotelId,req.user!.id)
    return res.status(201).json(result)
}catch(err){
    next(err)
}
}
export const getAllRoom=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
    const result=await roomService.getAllRoom(req.query)
    return res.json(result)
}catch(err){
    next(err)
}
}
export const getRoomById=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
    const result=await roomService.getRoomById(Number(req.params.id))
    return res.json(result)
}catch(err){
    next(err)
}
}
export const updateRoom=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await roomService.updateRoom(Number(req.params.id),req.body,req.body.hotelId,req.user!.id)
        return res.json(result)
    }catch(err){
        next(err)
    }
}
export const deleteRoom=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await roomService.deleteRoom(Number(req.params.id),req.body.hotelId,req.user!.id)
        return res.json({message:"Deleted"})
    }catch(err){
        next(err)
    }
}