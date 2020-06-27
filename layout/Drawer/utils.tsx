import React from 'react'

const Headmaster = ({ config: { name, image, intro } }) => {
    return (
        <div className="our-headmaster card">
            <img className="lijun" src={image} />
            <div className="headmaster-title">
                <img alt={name} src="/static/icon/person-outline.svg" width="20" height="20" />
                &nbsp;&nbsp;{name}
            </div>
            <div className="headmaster-content">
                {intro.map((int: { title: React.ReactNode; content: React.ReactNode }) => (
                    <>
                        <div className="headmaster-content-title">
                            {int.title}:
                        </div>
                        <div className="headmaster-content-text">
                            {int.content}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

const CardMenu = () => {
    return (
        <div className="card-menu card">
            {[
                {
                    text: '云极客工具',
                    icon: <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><title>ionicons-v5-e</title><polyline points='416 128 192 384 96 288' style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }} /></svg>,
                    href: 'https://www.ygktool.cn'
                }
            ].map(item => (
                <a key={item.text} href={item.href} className="card-menu-item">
                    {item.icon}
                    <div className="card-menu-item-text">{item.text}</div>
                </a>
            ))}
        </div>
    )
}

export { CardMenu, Headmaster }