import * as React from 'react'
import LazyLoad from 'react-lazyload'

export default ({ src, alt }: {
    src: string,
    alt?: string
}) => {
    console.log(src)
    return (
        <LazyLoad height={100}>
            <img src={src} />
            <div className="typo-img-caption">{alt}</div>
        </LazyLoad>
    )
}
