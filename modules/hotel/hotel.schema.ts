import { z } from "zod";

// 1. Создание отеля (проверяем body)
export const createHotelSchema = z.object({
    name:z.string(),
    address:z.string()
  })

