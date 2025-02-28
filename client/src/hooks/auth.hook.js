// пишем хук для авторизации на frontend

import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

// модуль отвечает за авторизацию человека в системе
// экспортирует методы чтобы зайти в систему или из не выйти

export const useAuth = () => {
    // будет работа с JWT-токеном, если мы его получаем, то будем хранить в LocalStorage(базовый браузерный API)
    // т.е когда мы перезагрузим систему, проверяем есть ли токен в LocalStorage, если есть то кидаем человека в систему

    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    // при загрузке приложения по умолчанию мы хотим чтобы данный хук смотрел есть ли данные в LocalStorage, если есть то загружаем их в локальные состояния - для этого используем useEffect
    useEffect(() => {
        // из строки в объект
        const data = JSON.parse(localStorage.getItem(storageName))

        // если данные есть то заходим в систему
        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}
