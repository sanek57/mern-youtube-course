// useCallBack - чтобы react не уходил в уикличную рекурсию
import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback( (text) => {
        // M - это объект из библиотеки materialized, который становится доступен в window, при подключении данной библиотеки
        
        if(window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}