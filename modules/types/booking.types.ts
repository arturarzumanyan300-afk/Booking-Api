import { BookingStatus } from "@prisma/client";

export interface CreateBooking{
    roomId:number
    startDate:Date;
    endDate:Date;

}
export interface UpdateBooking {
  status:"PENDING" | "CONFIRMED" | "CANCELLED";
}
export interface BookingFilter {
  page?:number;
  limit?:number;
  status?:BookingStatus;
}