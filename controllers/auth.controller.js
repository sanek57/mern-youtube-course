import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { validationResult } from 'express-validator'

export const register = async (req, res) => {
    try {
        console.log('/register - Get data from client', req.body)

        // validationResult - возвращает массив ошибок валидации, функция из пакета express-validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации',
            })
        }

        // получаем данные поля из теля запроса, данные поля мы отправляем с frontend
        const { email, password } = req.body

        // проверяем на существование пользователя с таким email
        // findOne() - ищем именно 1 пользователя
        const candidate = await User.findOne({ email: email })

        if (candidate) {
            return res.status(400).json({
                message: 'Пользователь с таким email уже существует!',
            })
        }

        // хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ email: email, password: hashedPassword })

        // сохраняем данные в модели
        await newUser.save()

        // отправляем ответ о том, что пользователь зарегистрирован
        res.status(201).json({ message: 'Пользователь создан' })
    } catch (err) {
        // отправляем сообщение об ошибке в случае ошибки в теле запроса
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

export const login = async (req, res) => {
    console.log('/login - Get data from client', req.body)

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему',
            })
        }

        // логика по созданию нашего пользователя
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: 'Пользователь не найден',
            })
        }

        // мы уже нашли пользователя
        // теперь проверяем пароли посредством пакета bcrypt
        const isMatch = await bcrypt.compare(password, user.password)

        // пароли не совпалиадают, возвращаем ошибку
        if (!isMatch) {
            return res.status(400).json({
                // хорошая практика не писать что именно не совпадает, чтобы не давать потенциальным хакерам юзать ошибку
                // но тк проект учебный пишем так
                message: 'Неверный пароль, попробуйте снова',
            })
        }

        // генерируем JWT-токен для пользователя
        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
            expiresIn: '1h',
        })

        // статус не передаем тк по умолчанию он 200
        res.json({ token, userId: user.id })
    } catch (err) {
        // отправляем сообщение об ошибке в  случае ошибки в теле запроса
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}
