import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth.types";

export const generateAccessToken=(payload:AuthUser)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {expiresIn:"60m"}
    )
}
export const generateRefreshToken=(payload:AuthUser)=>{
    return jwt.sign(
        payload,
        process.env.REFRESH_SECRET!,
        {expiresIn:"7d"}
    )
}
export const verifyAccessToken=(token:string)=>{
    return jwt.verify(token,process.env.JWT_SECRET!)as AuthUser
}
export const verifyRefreshToken=(token:string)=>{
    return jwt.verify(token,process.env.REFRESH_SECRET!)as AuthUser
}