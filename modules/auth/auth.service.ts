import { email } from "zod";
import { prisma } from "../config/prisma";
import { redis } from "../config/redis";
import { LoginDto, RegisterDto } from "../types/auth.types";
import { AppError } from "../utils/error";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";

export const register=async(data:RegisterDto)=>{
    const existing=await prisma.user.findUnique({where:{email:data.email}})
    if(existing){throw new AppError("User already existing",409)}
    const hash=await hashPassword(data.password)
    const user=await prisma.user.create({data:{email:data.email,password:hash}})
    return{id:user.id,email:user.email}
}
export const login=async(data:LoginDto)=>{
    const user=await prisma.user.findUnique({where:{email:data.email}})
    if(!user){throw new AppError("User not found",401)}
    const valid=await comparePassword(data.password,user.password)
    if(!valid){throw new AppError("Wrong password",401)}
    const payload={id:user.id,email:user.email,role:user.role}
    const accessToken=generateAccessToken(payload)
    const refreshToken=generateRefreshToken(payload)
    await redis.set(`refresh:${user.id}`,refreshToken,"EX",7*24*60*60)
    return{accessToken,refreshToken}
}
export const refresh=async(refreshToken:string)=>{
    if(!refreshToken){throw new AppError("No token",401)}
    const decoded=await verifyRefreshToken(refreshToken)
    const exists=await redis.get(`refresh:${decoded.id}`)
    if(!exists){throw new AppError("Invalid token",401)}
    const newAccessToken=generateAccessToken({id:decoded.id,email:decoded.email,role:decoded.role})
    return{accessToken:newAccessToken}
}
export const logout=async(refreshToken:string)=>{
    if(!refreshToken){throw new AppError("No token",401)}
    const decoded=await verifyRefreshToken(refreshToken)
    const exists=await redis.get(`refresh:${decoded.id}`)
    if(!exists){throw new AppError("Invalid session",401)}
    await redis.del(`refresh:${decoded.id}`)
    return{message:"LOGGET OUT"}
}