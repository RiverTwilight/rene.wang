import * as React from 'react'
import '../scss/passageLine.scss'

export default ({ slug, title, cover, summary, date }: Readonly<{
    title: string;
    summary: string;
    slug: string;
    cover?: string;
    date?: string;
}>) => {
    return (
        <div className="passage-item" key={title}>
            <div className="passage-item-header">
                <a href={'/blog/' + slug} className="passage-item-header-title">
                    {title.replace('&nbsp;', ' ')}
                </a>
                <div className="passage-item-header-date">{date}</div>
            </div>
            <div className="passage-item-content">
                <div style={{ display: cover ? 'block' : 'none' }} className="passage-item-content-cover">
                    <div className="passage-item-content-cover-inner">
                        <img alt={title.replace('&nbsp;', ' ')} src={cover} />
                    </div>
                </div>
                <div className="passage-item-content-text">
                    {summary.replace(/<\.+>/g, '')}
                </div>
            </div>
            <div className="passage-item-action">
            </div>
        </div>
    )
}
