import Link from '../models/Link.js'
import config from 'config'
import shortid from 'shortid'

export const createLink = async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl') // URL где будет в последующем развернут сервер
        const { from } = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({ code })

        // если такая ссылка уже существует, то возвращаем ее
        if (existing) {
            return res.json({ link: existing })
        }

        // иначе генерируем новую и сохраняем в базе
        const to = baseUrl + '/t/' + code

        const link = new Link({
            code,
            to,
            from,
            owner: req.user.userId,
        })

        await link.save()

        res.status(201).json({ link })
    } catch (err) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

export const getAllLinks = async (req, res) => {
    try {
        // req.user.userId - складывается в запрос на этапе проверки аутентификации в middleware auth.middleware.js
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (err) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

export const getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (err) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}
