import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import config from 'config'
import routerAuth from './routes/auth.routes.js'
import routerLink from './routes/link.routes.js'
import routerRedirect from './routes/redirect.routes.js'

const PORT = config.get('port') || 5000
const __dirname = path.resolve()

const app = express()

// Middleware пишем в том порядке в котором они будут использоваться

// MiddleWare для того чтобы Express умел работать с JSON
app.use(express.json())
// cors
// app.use((req, res, next)=> {
//     res.header("Access-Conteol-Allow-Headers", "http://localhost:5000")
//     res.header("Access-Conteol-Allow-Origin", "*")
//     next()
// })

// когда промежуточные библиотеки настроены, мы добавляем  код обработки путей в цепочку обработки запросов.

// MiddleWare для работы с маршрутизацией
app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)
app.use('/t', routerRedirect)

// указали откуда серверу брать статику во время работы сервера
// чтобы frontend и backend работали одновременно и NodeJs ха это отвечала
// делаем уже после прописания router
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.resolve(__dirname, 'client', 'build')))

    app.get('*', (req, res) => [
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
    ])
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {}).then(() => {
            console.log('MongoDB connected')
        })

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.log('MongoDB not connected!', err)
    }
}

start()
