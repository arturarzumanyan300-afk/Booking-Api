import {z} from "zod"

export const registerSchema=z.object({
email:z
.string()
.email("Invalid email"),
password:z
.string()
.min(5,"Password min 5 chars")
})
export const loginSchema=z.object({
email:z
.string()
.email("Invalid email"),
password:z
.string()
.min(5,"Password min 5 chars")
})
export const refreshSchema=z.object({
    refreshToken:z
    .string()
    .min(1,"RefreshToken is required")
})
export const logoutSchema=z.object({
    refreshToken:z
    .string()
    .min(1,"RefreshToken is required")
})