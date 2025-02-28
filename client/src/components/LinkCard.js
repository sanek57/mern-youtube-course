import React from 'react'

// будет отображать конкретную ссылку и статистику по ней
export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Ссылка</h2>
            {/* ref - чтобы React корректно работал с ссылками */}
            <p>
                Ваша ссылка:{' '}
                <a href={link.to} target="__blank" rel="noopener noreferrer">
                    {link.to}
                </a>
            </p>
            <p>
                Откуда:{' '}
                <a href={link.to} target="__blank" rel="noopener noreferrer">
                    {link.from}
                </a>
            </p>
            <p>
                Количество кликов по ссылке: <strong>{link.clicls}</strong>
            </p>
            <p>
                Дата создания:{' '}
                <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    )
}
