import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import '../scss/passageLine.scss'
import '../scss/typo.scss'

export default ({ slug, title, cover, summary, date }: Readonly<{
    title: string;
    summary: string;
    slug: string;
    cover?: string;
    date?: string;
}>) => {
    const [expand, setExpand] = React.useState(false)
    return (
        <div className={"passage-item"}>
            <div className="passage-item-header">
                <a href={'/blog/' + slug} className="passage-item-header-title">
                    {title.replace('&nbsp;', ' ')}
                </a>
                <div className="passage-item-header-date">{date}</div>
            </div>
            <div className={`passage-item-content ${!expand && "passage-item-content-close"}`}>
                <div style={{ display: cover ? 'block' : 'none' }} className="passage-item-content-cover">
                    <div className="passage-item-content-cover-inner">
                        <img alt={title.replace('&nbsp;', ' ')} src={cover} />
                    </div>
                </div>
                <div className="typo passage-item-content-text">
                    {expand ? <ReactMarkdown source={summary}></ReactMarkdown> : summary.replace(/\<[^\>]+\>/g, '')}
                </div>
            </div>
            <div onClick={() => {
                setExpand(!expand)
            }} className={`passage-item-action ${expand ? 'passage-item-action-sticky' : ''}`}>
                <span className="passage-item-readmore">{expand ? "收起" : "展开全文"}</span>
            </div>
        </div>
    )
}
