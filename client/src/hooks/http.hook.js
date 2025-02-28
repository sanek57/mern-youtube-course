import { useState, useCallback } from 'react'
// будет позволять нам кофмортно работать с http запросасми на сервер, используя нативный API браузера fetch(), в формате хуков

// данный хук будет позволять взаимодействовать с сервером и он будет нам экспортировать сущности, которые мы сгрупируем в данном модуле
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // добавляем хук useCallback, чтобы React не уходил в рекурсию при вызове функции

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            if (body) {
                body = JSON.stringify(body)
                // добавляем заголовки в запрос о том что передается json
                headers['Content-Type'] = 'application/json'
            }

            console.log('Prepare data for send', body)

            // начали запрос - изменили значение стейта
            setLoading(true)

            try {
                // отправляем запрос на сервер
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                })

                // парсим ответ от сервера
                const data = await response.json()
                // console.log(data)
                if (!response.ok) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                // закончили запрос успешно - изменили значение стейта
                setLoading(false)
                return data
            } catch (err) {
                // закончили запрос с ошибкой - изменили значение стейтов

                setLoading(false)
                setError(err.message)
                throw err
            }
        },
        []
    )

    // функция для чистки объекта ошибок
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
