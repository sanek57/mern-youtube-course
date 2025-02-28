import jwt from 'jsonwebtoken'
import config from 'config'

export default (req, res, next) => {
    // OPTIONS - проверяет доступность сервера
    if (req.method === 'OPTIONS') {
        next()
    }

    // POST GET ...

    try {
        //  Принимаем с Frontend - строка Bearer TOKEN
        const token = req.headers.authorization.split(' ')

        if (!token) {
            res.status(401).json({ message: 'Нет авторизации' })
            return
        }
        // декодируем токен из строки
        const decoded = jwt.verify(token[1], config.get('jwtSecret'))

        // на выходе получаем объект который мы зашили в токен на этапе авторизации пользователя в auth.contoller login()
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Exception: Нет авторизации' })
    }
}
