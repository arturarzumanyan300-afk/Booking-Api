import { Router } from "express";
import * as hotelController from "./hotel.controller";
import { createHotelSchema } from "./hotel.schema";
import { validationMiddleware } from "../middleware/validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Получить список отелей
 *     tags:
 *       - Hotels
 *
 *     responses:
 *       200:
 *         description: Список отелей
 */
router.get("/",hotelController.getAllhotels);
/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Получить отель по ID
 *     tags:
 *       - Hotels
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID отеля
 *
 *     responses:
 *       200:
 *         description: Отель найден
 *       404:
 *         description: Отель не найден
 */
router.get("/:id", hotelController.getHotelById);
/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Создать отель
 *     tags:
 *       - Hotels
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
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Hilton Yerevan"
 *               description:
 *                 type: string
 *                 example: "Luxury hotel"
 *
 *     responses:
 *       201:
 *         description: Отель создан
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 */
router.post("/", authMiddleware, validationMiddleware(createHotelSchema),hotelController.createHotel);
/**
 * @swagger
 * /hotels/{id}:
 *   put:
 *     summary: Обновить отель
 *     tags:
 *       - Hotels
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Отель обновлён
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец
 *       404:
 *         description: Отель не найден
 */
router.put("/:id", authMiddleware, hotelController.updateHotel);
/**
 * @swagger
 * /hotels/{id}:
 *   delete:
 *     summary: Удалить отель
 *     tags:
 *       - Hotels
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
 *         description: Отель удалён
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец
 *       404:
 *         description: Отель не найден
 */
router.delete("/:id", authMiddleware, hotelController.deleteHotel);

export default router;
