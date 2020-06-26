import React from 'react'
import Button from '../components/Button'
import '../scss/poster.scss'

const ScrollImg = ({ children, bg }) => (
    <p style={{
        backgroundImage: `url(${bg})`
    }} class="g-img1 bg">
        {children}
    </p>
)

export default () => {
    return (
        <div className="poster">
            <div className="headline">
                成外高新
            </div>
            <p className="introduce">
                在开发中，以这种方式表示样式可让你在编辑样式时对其进行热重载，这意味着你可以保持应用程序的状态。
            </p>
            <ScrollImg
                bg="http://7953524.s21i.faiusr.com/2/ABUIABACGAAgjIP40AUou5fWHzCADzjCAw.jpghttp://7953524.s21i.faiusr.com/2/ABUIABACGAAgjIP40AUou5fWHzCADzjCAw.jpg"
            >培养学生终生发展力</ScrollImg>
            <Button>
                <a href="#">报名</a>
            </Button>
        </div>
    )
}
