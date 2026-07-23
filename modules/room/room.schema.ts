import {z} from "zod"

export const createRoomSchema=z.object({
    title:z
    .string()
    .min(1),
    price:z
    .number()
    .int(),
    capacity:z
    .number()
    .int(),
    hotelId:z
    .number()
    .int()

   
})
export const updateRoomSchema=z.object({
    title:z
    .string()
    .min(1)
    .optional(),
    price:z
    .number()
    .int()
    .optional(),
    capacity:z
    .number()
    .int()
    .optional(),
    hotelId:z
    .number()
    .int()

    
})
