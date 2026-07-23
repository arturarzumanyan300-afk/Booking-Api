import { validationMiddleware } from "../middleware/validation.middleware"
import * as authController from "./auth.controller"

import { Router } from "express"
import { loginSchema, logoutSchema, refreshSchema, registerSchema } from "./auth.schema"
import { authMiddleware } from "../middleware/auth.middleware"
const router=Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/register",validationMiddleware(registerSchema),authController.register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Логин пользователя
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные данные
 */
router.post("/login",validationMiddleware(loginSchema),authController.login)
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновить токен
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Токен обновлен
 *       401:
 *         description: Не авторизован
 */
router.post("/refresh",authMiddleware,validationMiddleware(refreshSchema),authController.refresh)
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход из системы
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Успешный выход
 *       401:
 *         description: Не авторизован
 */
router.post("/logout",authMiddleware,validationMiddleware(logoutSchema),authController.logout)

export default router