import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

export const NavBar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()

        auth.logout()
        // возвращаемся на главную страницу
        navigate('/')
    }

    return (
        <nav>
            <div
                class="nav-wrapper blue darken-1"
                style={{ padding: '0 2rem' }}
            >
                <span class="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/create">Создать</NavLink>
                    </li>
                    <li>
                        <NavLink to="/links">Ссылки</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHandler}>
                            Выйти
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
