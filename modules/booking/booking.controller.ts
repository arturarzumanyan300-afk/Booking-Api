import {Request,Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.types"
import * as bookingService from "./booking.service"

export const createBooking=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await bookingService.createBooking(req.user!.id,req.body)
        return res.status(201).json(result)
    }catch(err){
        next(err)
    }
}
export const getAllBookings=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await bookingService.getAllBookings(req.user!.id,req.query)
        return res.json(result)
    }catch(err){
        next(err)
    }
}
export const getBookingById=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await bookingService.getBookingById(Number(req.params.id),req.user!.id)
        return res.json(result)
    }catch(err){
        next(err)
    }
}
export const updateBooking=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await bookingService.updateBooking(Number(req.params.id),req.body,req.user!.id)
        return res.json(result)
    }catch(err){
        next(err)
    }
}
export const deleteBooking=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const result=await bookingService.deleteBooking(Number(req.params.id),req.user!.id)
        return res.json({message:"Deleted"})
    }catch(err){
        next(err)
    }
}