import { authMiddleware } from "../middleware/auth.middleware"
import { validationMiddleware } from "../middleware/validation.middleware"
import * as roomController from "./room.controller"
import { Router } from "express"
import { createRoomSchema,updateRoomSchema } from "./room.schema"
const router=Router()

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Создать комнату
 *     tags:
 *       - Rooms
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
 *               - price
 *               - hotelId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Deluxe Room"
 *               price:
 *                 type: number
 *                 example: 120
 *               hotelId:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Комната создана
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец отеля
 *       404:
 *         description: Отель не найден
 */
router.post("/",authMiddleware,validationMiddleware(createRoomSchema),roomController.createRoom)
/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Получить список комнат
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Список комнат
 *       401:
 *         description: Не авторизован
 */
router.get("/",authMiddleware,roomController.getAllRoom)
/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Получить комнату по ID
 *     tags:
 *       - Rooms
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
 *         description: Комната найдена
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Комната не найдена
 */
router.get("/:id",authMiddleware,roomController.getRoomById)
/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Обновить комнату
 *     tags:
 *       - Rooms
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
 *               price:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Комната обновлена
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец
 *       404:
 *         description: Комната не найдена
 */
router.put("/:id",authMiddleware,validationMiddleware(updateRoomSchema),roomController.updateRoom)
/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Удалить комнату
 *     tags:
 *       - Rooms
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
 *         description: Комната удалена
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Не владелец
 *       404:
 *         description: Комната не найдена
 */
router.delete("/:id",authMiddleware,roomController.deleteRoom)


export default router