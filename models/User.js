// чтобы создать модель работаем с mongoose
// Types - чтобы получить id (Types.ObjectId), который определен в MongoDB, - это связка модели пользователя и определенных записей в БД

import { Schema, model, Types } from 'mongoose'

// Создаем сущности для работы с пользователями

// Типы полей в БД
// required - поле обязательное
// unique - уникальное поле
const schema = new Schema({
    // задем список полей для модели пользователей
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // это будет массив объектов
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

// Делаем логику на регистрации пользователей




// экспортируем модель, с названием User, работающей по схеме schema
export default model('User', schema)
