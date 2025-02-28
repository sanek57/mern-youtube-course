import { Router } from 'express'

import auth from '../middleware/auth.middleware.js'

import {
    createLink,
    getAllLinks,
    getLinkById,
} from '../controllers/link.controller.js'

const routerLink = Router()

// обаботка генерации ссылок
routerLink.post('/generate', auth, createLink)

// получение всех ссылок
routerLink.get('/all', auth, getAllLinks)

// получение ссылки по id
routerLink.get('/:id', auth, getLinkById)

export default routerLink
