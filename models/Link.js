import { Schema, model, Types } from 'mongoose'

// Создаем сущности для работы с ссылками

const schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true, unique: true },
    code: { type: String, require: true, unique: true },
    date: { type: Date, default: Date.now },
    clicls: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User' },
})

export default model('Link', schema)
