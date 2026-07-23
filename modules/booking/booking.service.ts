import { prisma } from "../config/prisma";
import { BookingFilter, CreateBooking, UpdateBooking } from "../types/booking.types";
import { AppError } from "../utils/error";

export const createBooking=async(userId:number,data:CreateBooking)=>{
    const result=await prisma.booking.create({data:{userId,...data}})
    return result
}
export const getAllBookings=async(userId:number,filter:BookingFilter)=>{
    const status=filter.status
    const page= Number(filter?.page)|1
    const limit=Number(filter?.limit)|10
    const skip=(page-1)*limit
        const where:any={userId}
          if (status) {
    where.status = status;
  }
const result=await prisma.booking.findMany({where,skip,take:limit
   ,include:{room:true},orderBy:{createdAt:"desc"}})
    return result
}
export const getBookingById=async(id:number,userId:number)=>{
    const result=await prisma.booking.findFirst({where:{id,userId},include:{room:true}})
    return result
}
export const updateBooking=async(id:number,data:UpdateBooking,userId:number)=>{
    const booking=await prisma.booking.findFirst({where:{id,userId}})
    if(!booking){throw new AppError("Booking not found",404)}
    const result =await prisma.booking.update({where:{id},data})
    return result
}
export const deleteBooking=async(id:number,userId:number)=>{
    const booking=await prisma.booking.findFirst({where:{id,userId}})
    if(!booking){throw new AppError("Booking not found",404)}
    const result=await prisma.booking.delete({where:{id}})
    return result
}