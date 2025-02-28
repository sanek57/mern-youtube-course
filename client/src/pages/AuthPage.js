import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
    // пользуемся хуком useContext чтобы получить контекст приложения, передаем в него контекст который мы в App.js,
    // теперь в объекте auth есть все те данные которые мы передаем в Provider
    const auth = useContext(AuthContext)

    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    // следим за изменением [error, message]
    useEffect(() => {
        // будем обрабатывать только поле message из объекта error
        // конкретику ошибок не обрабыватываем, но доступ к ним есть в объекте error

        // выводим всплывающее окно
        message(error)
        clearError()
    }, [error, message, clearError])

    // сделали активными поля input - чтобы подсказка была сверху иначе она перекрывает placeholderText
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (ev) => {
        // name - атрибут из input формы, value - значение из поля
        setForm({ ...form, [ev.target.name]: ev.target.value })
    }

    // пишем методы для осуществления запросов на сервер

    // метод на регистрацию
    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {
                // данные которые уходят на сервер
                // разворачиваем локальные state form, который содержит email и password
                ...form,
            })

            console.log(`Registration complited`)
        } catch (e) {
            // пустой тк мы его уже обработали в useHTTP
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {
                ...form,
            })

            auth.login(data.token, data.userId)

            console.log(`Login complited`)
        } catch (err) {
            // пустой тк мы его уже обработали в useHTTP
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Cсылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder='Введите email'
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder='Введите пароль'
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: '10px' }}
                            onClick={loginHandler}
                            // блокировка кнопки пока выполняется запрос
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1  
                        black-text"
                            onClick={registerHandler}
                            // блокировка кнопки пока выполняется запрос
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
