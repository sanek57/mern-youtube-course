import {createContext} from 'react'

function noop(){}

// пишем контекст, который сможет передавать параметры не по древовидной структуре, а по всему нашему приложению
export const AuthContext = createContext( {
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
})