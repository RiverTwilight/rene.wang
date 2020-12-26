import * as React from "react";
import styled from "styled-components";
import Search from "./Search";
import Logo from "../../static/logo.svg";
import LogoLarge from "../../static/logo&title-small.svg";
import Text from "../../utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../utils/AcitiveLink";
import "../../scss/header.scss";

/**
 * 头部
 * @todo 分离各个组件rr
 */

const ShareIcon = styled.path`
	fill: #1da1f2;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 48px;
`;

const Menu = ({ lang }): React.ReactElement => {
	return (
		<ul className="app-header-list">
			<Text dictionary={nav} language={lang}>
				{[
					{
						text: <Text homePage />,
						to: "/",
					},
					{
						text: <Text secondPage />,
						to: "/special",
					},
				].map((item, i) => (
					<ActiveLink
						activeClassName="app-header-list-item-active"
						href={item.to}
					>
						<a className="app-header-list-item">{item.text}</a>
					</ActiveLink>
				))}
			</Text>
		</ul>
	);
};

const MainHeader = ({ siteConfig, allPosts, lang }) => (
	<div className="app-header-inner">
		<a href="/" className="logo-large hidden-sm-down">
			<LogoLarge />
		</a>
		<a href="/" className="logo-small hidden-md-up">
			<Logo />
		</a>
		<Menu lang={lang} />
		<div className="app-header-space"></div>
		<Search locale={lang} allPosts={allPosts} />
	</div>
);

class Header extends React.Component<
	{
		config: any;
		allPosts: any;
		currentPage?: ICurrentPage;
		lang?: string;
	},
	{
		subHeader: boolean;
	}
> {
	t1 = 0;
	constructor(props: any) {
		super(props);
		this.state = {
			subHeader: false,
		};
	}
	handleScroll = () => {
		if (!window.scrollListener) {
			window.scrollListener = setTimeout(() => {
				let t2 =
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				if (t2 > this.t1) {
					this.setState({ subHeader: true });
				} else if (t2 < this.t1) {
					this.setState({ subHeader: false });
				}
				clearTimeout(window.scrollListener);
				window.scrollListener = null;
				this.t1 = t2;
			}, 100);
		}
	};
	componentDidMount() {
		this.props.currentPage.path.match(/\/blog\/\S+/) &&
			this.activeMonitor();
	}
	activeMonitor() {
		this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
		window.addEventListener("scroll", this.handleScroll);
	}
	render() {
		const { subHeader } = this.state;
		const { lang, config, allPosts, currentPage } = this.props;
		return (
			<>
				<div
					style={{
						marginTop: subHeader ? "-50px" : "",
						height: !subHeader ? "50px" : "",
					}}
					className="app-header"
				>
					<MainHeader
						lang={lang}
						siteConfig={config}
						allPosts={allPosts}
					/>
				</div>
			</>
		);
	}
}

export default Header;
