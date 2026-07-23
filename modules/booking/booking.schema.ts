import {z} from "zod"



export const createBookingSchema = z.object({

  roomId: z
    .number()
    .int(),

  startDate: z
    .string()
    .datetime(),

  endDate: z
    .string()
    .datetime()

})
.refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: "End date must be after start date",
    path:["endDate"]
  }
);



export const updateBookingSchema = z.object({

  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "CANCELLED"
    ])

});