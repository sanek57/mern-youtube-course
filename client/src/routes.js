import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

// определяем все наборы ссылок, в зависимсоти от типа пользователя - зареган он или нет
export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/links" element={<LinksPage />} />
                <Route exact path="/create" element={<CreatePage />} />
                <Route exact path="/detail/:id" element={<DetailPage />} />
                {/* если не попали никуда  то на страницу create  path='*' - слушаем все пути*/}
                <Route path="*" element={<Navigate to="/create" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<AuthPage />} />
            {/* если не попали никуда  то на главную страницу */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
