import * as React from 'react'
import styled from 'styled-components'

interface MarqueeProps {
    imgList: {
        url: string // img url
    }[],
    delay?: number
}

const ToggleIcon = styled.polyline`
    fill: transparent;
    stroke:#fff;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:48px;
`

const Marquee = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    overflow: hidden;
    border-radius: 3px;
    margin-bottom: 10px;
    button {
        position: absolute;
        border: 0;
        height: 50px;
        width: 30px;
        background: rgba(0, 0, 0, 0.5);
        transform: translate(0, -50%);
        top: 50%;
    }
    .marquee-next {
        right: 0;
    }
    .marquee-prev {
        left: 0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    ul {
        margin: 0;
        padding: 0;
        width: 9999px;
        transition: all 0.5s;
        li {
            float: left;
            width: 694px;
            height: 200px;
            list-style: none;
            line-height: 200px;
            font-size: 36px;
            transition: 0.5s width;
            -webkit-transition: width 0.5s;
        }
    }
`

/**
 * 轮播图组件
 */

export default class extends React.Component<MarqueeProps, { index: number; timer: any }>{
    constructor(props: MarqueeProps) {
        super(props);
        this.state = {
            index: 0,
            timer: null
        }
    }
    toggleNext() {
        const { imgList } = this.props
        const { index } = this.state;
        if (index < imgList.length - 1) {
            this.setState({ index: index + 1 })
        } else {
            this.setState({ index: 0 })
        }
    }
    togglePrev() {
        const { imgList } = this.props
        const { index } = this.state;
        if (index <= 0) {
            this.setState({ index: imgList.length })
        } else {
            this.setState({ index: index - 1 })
        }
    }
    setTimer() {
        this.state.timer && clearInterval(this.state.timer)
        const timer = setInterval(_ => {
            this.toggleNext()
        }, this.props.delay || 3500)
        this.setState({ timer: timer })
    }
    componentDidMount() {
        this.setTimer()
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    render() {
        const { index } = this.state;
        const { imgList } = this.props;
        return (
            <Marquee>
                <button
                    onClick={() => {
                        this.setTimer() // Reset timer for user-friendly
                        this.togglePrev()
                    }} className="marquee-prev">
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <ToggleIcon points='328 112 184 256 328 400' />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        this.setTimer()
                        this.toggleNext()
                    }}
                    className="marquee-next">
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <ToggleIcon points="184 112 328 256 184 400" />
                    </svg>
                </button>
                <div className="marquee-auto">
                    <ul>
                        {imgList.map((poster, i) => (
                            <li style={{ width: index === i ? '694px' : '0' }} key={i}>
                                <img src={poster.url} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Marquee>
        )
    }
}
