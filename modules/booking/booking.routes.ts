import { authMiddleware } from "../middleware/auth.middleware"
import { validationMiddleware } from "../middleware/validation.middleware"
import * as bookingController from "./booking.controller"
import { Router } from "express"
import { createBookingSchema, updateBookingSchema } from "./booking.schema"
const router=Router()

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Создать бронирование
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - startDate
 *               - endDate
 *             properties:
 *               roomId:
 *                 type: integer
 *                 example: 1
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-20
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-25
 *
 *     responses:
 *       201:
 *         description: Бронирование создано
 *       400:
 *         description: Неверные данные или комната недоступна
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Комната не найдена
 */
router.post("/",authMiddleware,validationMiddleware(createBookingSchema),bookingController.createBooking)
/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Получить список бронирований
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Список бронирований
 *       401:
 *         description: Не авторизован
 */
router.get("/",authMiddleware,bookingController.getAllBookings)
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Получить бронирование по ID
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Бронирование найдено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Бронирование не найдено
 */
router.get("/:id",authMiddleware,bookingController.getBookingById)
/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Обновить бронирование
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *
 *     responses:
 *       200:
 *         description: Бронирование обновлено
 *       400:
 *         description: Даты некорректны или занято
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец бронирования
 *       404:
 *         description: Бронирование не найдено
 */
router.put("/:id",authMiddleware,validationMiddleware(updateBookingSchema),bookingController.updateBooking)
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Удалить бронирование
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Бронирование удалено
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец бронирования
 *       404:
 *         description: Бронирование не найдено
 */
router.delete("/:id",authMiddleware,bookingController.deleteBooking)


export default router