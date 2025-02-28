import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth.context'
import { NavBar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'

function App() {
    // используем хук для работы с авторизацией
    const { token, login, logout, userId, ready } = useAuth()
    // проверям зарегистрирован сейчас пользователь в системе или нет - это мы можем определить по наличию токена
    const isAuthenticated = !!token // !! - привели к Boolean

    // проверяем авторизован ли пользователь, в зависимости от этого назначаем ему те или иниее роуты
    const routes = useRoutes(isAuthenticated)
    console.log('Ready', ready)


    // добавили проверку на загрузку - чтобы успевал отработать модуль авторизации тк он асинхронный
    // тк мы по умолчанию грузим route где нет авторизации
    if(!ready){
        return <Loader />
    }

    return (
        // сделали контекст для приложения, передали в него значения из нашего хука
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
        {/* чтобы использовать routes оборачиваем все наше приложение в BrowserRouter as Router */}
            <Router>
                {isAuthenticated && <NavBar/>}
                <div className="container">{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
