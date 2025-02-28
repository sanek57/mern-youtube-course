import { Router } from 'express'

import { redirectLink } from '../controllers/redirect.controller.js'

const routerRedirect = Router()

routerRedirect.get('/:code', redirectLink)

export default routerRedirect
