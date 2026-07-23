import app from "../app";
import { prisma } from "../config/prisma";
import { CreateRoom, QueryRoom, UpdateRoom } from "../types/room.types";
import { AppError } from "../utils/error";

export const createRoom = async (data: CreateRoom,hotelId: number,userId:number) => {
const hotel = await prisma.hotel.findUnique({ where: {id: hotelId}});
if (!hotel) {throw new AppError("Hotel not found", 404);}
if (hotel.ownerId !== userId) {throw new AppError("Forbidden", 403);}
const result = await prisma.room.create({
    data: {...data,hotelId}});
return result;
};
  

export const getAllRoom=async(filter:QueryRoom)=>{
    const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 10;
    const skip=(page-1)*limit
    const where:any={}
    const result=await prisma.room.findMany(
        {
            where,
            skip,
            take:limit,
            orderBy:{id:"desc"},
            include:{hotel:true}
        }
    )
    return result

}
export const getRoomById=async(id:number)=>{
    const result=await prisma.room.findUnique({where:{id},include:{hotel:true}})
return result
}

export const updateRoom=async(id:number,data:UpdateRoom,hotelId:number,userId:number)=>{
    const hotel=await prisma.hotel.findUnique({where:{id:hotelId}})
    if(!hotel){throw new AppError("Hotel not found",404)}
 if (hotel.ownerId !== userId) { throw new AppError("Forbidden", 403) }
  const result=await prisma.room.update({where:{id},data:{...data}})
    return result
}
export const deleteRoom=async(id:number,hotelId:number,userId:number)=>{
const hotel=await prisma.hotel.findUnique({where:{id:hotelId}})
if(!hotel){throw new AppError("Hotel not found",404)}
    if(hotel.ownerId!==userId){throw new AppError("Forbidden",403)}
    const result=await prisma.room.delete({where:{id}}
    )
    return result
}
