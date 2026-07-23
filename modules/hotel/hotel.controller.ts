import { Request, Response, NextFunction } from "express";
import * as hotelService from "./hotel.service";
import { AuthRequest } from "../types/auth.types";


export const createHotel=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await hotelService.createHotel(req.body,req.user!.id)
        return res.status(201).json(result)
    }catch(err){
        next(err)
    }
}
export const getHotelById=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await hotelService.getHotelById(Number(req.params.id))
        return res.json(result)
    }catch(err){
        next(err)
    }
}
export const updateHotel=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await hotelService.updateHotel(Number(req.params.id),req.body,req.user!.id)
        res.json(result)
    }catch(err){
        next(err)
    }
}
export const deleteHotel=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await hotelService.deleteHotel(Number(req.params.id),req.user!.id)
        res.json({message:"Deleted"})
    }catch(err){
        next(err)
    }
}
export const getAllhotels=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await hotelService.getAllHotels(req.query)
        res.json(result)
    }catch(err){
        next(err)
    }
}