import * as React from 'react'
import styled from 'styled-components'
import '../scss/marquee.scss'

interface MarqueeProps {
    /** 一个图片链接组成的数组 */
    imgList: {
        url: string
    }[],
    delay?: number
}

const ToggleIconLeft = styled.polyline`
    fill: transparent;
    stroke:#fff;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:48px;
`

const ToggleIconRight = styled(ToggleIconLeft)`
    transform:scaleX(-1);
    -ms-transform:scaleX(-1); 	/* IE 9 */
    -moz-transform:scaleX(-1); 	/* Firefox */
    -webkit-transform:scaleX(-1); /* Safari 和 Chrome */
    -o-transform:scaleX(-1); 
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
        const { index } = this.state
        return (
            <div className="marquee">
                <button
                    onClick={() => {
                        this.setTimer()//重新计时提高用户体验
                        this.togglePrev()
                    }} className="marquee-prev">
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <ToggleIconLeft points='328 112 184 256 328 400' />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        this.setTimer()
                        this.toggleNext()
                    }}
                    className="marquee-next">
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <ToggleIconRight points='328 112 184 256 328 400' />
                    </svg>
                </button>
                <div className="marquee-auto">
                    <ul>
                        {this.props.imgList.map((poster, i) => (
                            <li style={{ width: index === i ? '694px' : '0' }} key={i}>
                                <img className="poster" src={poster.url} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
