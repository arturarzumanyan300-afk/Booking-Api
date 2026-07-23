import { prisma } from "../config/prisma";
import { CreateHotelDto, HotelQuery, UpdateHotelDto } from "../types/hotel.types";
import { AppError } from "../utils/error";

export const createHotel=async(data:CreateHotelDto,userId:number)=>{
const hotel= await prisma.hotel.create({data:{...data,ownerId:userId}})
return hotel
}
export const getHotelById = async (id: number) => {
  const hotel = await prisma.hotel.findUnique({where: { id }});
return hotel;
};
export const updateHotel=async(id:number,data:UpdateHotelDto,user:any)=>{
    const hotel=await prisma.hotel.findUnique({where:{id}})
        return prisma.hotel.update({
            where:{id},data
        })
}
export const deleteHotel = async (id: number, user: any) => {
const hotel = await prisma.hotel.findUnique({where: { id }});
await prisma.hotel.delete({where: { id }});
};
export const getAllHotels = async (filter:HotelQuery) => {
const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 10;
  const skip = (page - 1) * limit;
const where: any = {};

  const hotels = await prisma.hotel.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  });
return hotels;};