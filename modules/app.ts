import express from "express"
import authRoutes from "./auth/auth.routes"
import hotelRoutes from "./hotel/hotel.routes"
import roomRoutes from "./room/room.routes"
import bookingRoutes from "./booking/booking.routes"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
const app=express()
app.use(express.json())
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/auth",authRoutes)
app.use("/hotels",hotelRoutes)
app.use("/rooms",roomRoutes)
app.use("/bookings",bookingRoutes)


export default app