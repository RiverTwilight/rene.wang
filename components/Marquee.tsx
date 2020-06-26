import * as React from 'react'
import '../scss/marquee.scss'

interface MarqueeProps {
    /** 一个图片链接组成的数组 */
    imgList: string[],
    delay?: number
}

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

                </button>
                <button
                    onClick={() => {
                        this.setTimer()
                        this.toggleNext()
                    }}
                    className="marquee-next">
                    <svg viewBox="0 0 512 512"><path fill="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M184 112l144 144-144 144"></path></svg>
                </button>
                <div className="marquee-auto">
                    <ul>
                        {this.props.imgList.map((img, i) => (
                            <li style={{ width: index === i ? '694px' : '0' }} key={i}>
                                <img className="poster" src={img} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
