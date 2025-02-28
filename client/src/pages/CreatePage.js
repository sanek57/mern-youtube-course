import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook.js'
import { AuthContext } from '../context/auth.context'
import { useNavigate } from 'react-router-dom'

// будет создавать новую ссылку, которая в итоге будет сокращенной
export const CreatePage = () => {
    const navigate = useNavigate()

    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    // сделали активными поля input - чтобы подсказка была сверху иначе она перекрывает placeholderText
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request(
                    'api/link/generate',
                    'POST',
                    { from: link }, // body
                    { Authorization: `Bearer ${auth.token}` } // headers
                )
                // console.log(data)
                navigate(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}
