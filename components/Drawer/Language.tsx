import * as React from "react";
import { useRouter } from "next/router";

/*
class Language extends React.Component
    <
    {
        list: { text: string, code: lang }[];
        cb(newLang: lang): void;
        value: lang
    }, {
        isShowUl: boolean;
        style: {};
    }
    >
{
    input: any
    constructor(props) {
        super(props);
        this.state = {
            isShowUl: false,
            style: {}
        }
    }
    componentDidMount() {
        this.setState({
            style: {
                position: "fixed",
                top: this.input.getBoundingClientRect().top + this.input.style.height,
                left: this.input.getBoundingClientRect().left
            }
        })
    }
    render() {
        const { isShowUl, style } = this.state
        const { list, cb, value } = this.props;
        return (
            <>
                <div className="select language">
                    <button
                        className=""
                        ref={r => this.input = r}
                        onClick={() => {
                            this.setState({ isShowUl: true }, () => {
                                document.body.addEventListener('click', () => {
                                    this.setState({ isShowUl: false });
                                    document.body.removeEventListener('click', () => { })
                                })
                            })
                        }}
                    >{list.filter(lang => lang.code === value)[0].text}</button>
                    <div style={Object.assign({
                        display: isShowUl ? 'block' : 'none'
                    }, style)}>
                        <span className="arrow-up"></span>
                        <ul className="card">
                            {list.map(({ code, text }) => (
                                <li key={code} onClick={_ => {
                                    cb && cb(code);
                                    this.setState({ isShowUl: false })
                                }}>{text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}
*/

const Language = ({ list, value }) => {
	const router = useRouter();
	return (
		<div>
			|
			{list.map((l: { code: string; text: React.ReactNode }) => (
				<a
                    key={l.code}
                    className="Textc(primary):h "
					onClick={() => {
						router.push("/", "/", { locale: l.code });
					}}
				>
					&nbsp;{l.text}&nbsp;|
				</a>
			))}
		</div>
	);
};

export default Language;
