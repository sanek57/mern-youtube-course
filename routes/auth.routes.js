import { Router } from 'express'
import { check } from 'express-validator'
import { login, register } from '../controllers/auth.controller.js'

// express.Router, - позволяет группировать обработчики маршрутов для определённой части сайта и получать к ним доступ через общий префикс маршрута.

const routerAuth = Router()

// /register будет конкатенироваться с /api/auth (мы их задали для данного route в файле app.js)
// /api/auth/register
routerAuth.post(
    '/register',
    // добавляем массив Middleware для валидации данных
    [
        // isEmail() - встроенная проверка на email из пакета express-validator
        // isLength() - встроенная проверка на длину строки из пакета express-validator
        check('email', 'Поле email должно быть заполнено').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({
            min: 6,
        }),
    ],
    register
)

routerAuth.post(
    '/login',
    [
        // exists() - проверка на существование пароля
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    login
)

export default routerAuth
