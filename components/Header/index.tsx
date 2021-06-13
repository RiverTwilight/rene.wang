import * as React from "react";
import styled from "styled-components";
// import Search from "./Search";
import Logo from "../../static/logo.svg";
import GithubLogo from "../../static/icon/logo-github.svg";
import TwitterLogo from "../../static/icon/logo-twitter.svg";
import LogoLarge from "../../static/logo&title-small.svg";
import Text from "../../utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../utils/AcitiveLink";
import "./Header.scss";

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
		<nav className="app-header-item app-header-nav">
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
		</nav>
	);
};

const Contact = ({
	github = "https://github.com",
	twitter,
}: {
	github?: string;
	twitter?: string;
}) => {
	return (
		<div className="Dis(flex)">
			<a
				href={github}
				className="app-header-icon app-header-item Cur(pointer)"
			>
				<GithubLogo />
			</a>
			<a
				href={twitter}
				className="app-header-icon app-header-item Cur(pointer)"
			>
				<TwitterLogo />
			</a>
		</div>
	);
};

// TODO 单独的搜索页面
const MainHeader = ({ siteConfig, lang }) => (
	<div className="app-header-inner Dis(flex)">
		<a
			href="/"
			className="app-header-item logo-large Cur(pointer) hidden-sm-down"
		>
			<LogoLarge />
		</a>
		<a href="/" className="app-header-item logo-small hidden-md-up">
			<Logo />
		</a>
		<Menu lang={lang} />
		<div className="app-header-space"></div>
		<Contact
			twitter={siteConfig.author.twitter}
			github={siteConfig.author.github}
		/>
		{/* <Search locale={lang} allPosts={allPosts} /> */}
	</div>
);

class Header extends React.Component<
	{
		siteConfig: any;
		// allPosts: any;
		currentPage?: ICurrentPage;
		lang?: string;
	},
	{
		showHeader: boolean;
	}
> {
	t1 = 0;
	constructor(props: any) {
		super(props);
		this.state = {
			showHeader: true,
		};
	}
	handleScroll = () => {
		if (!window.scrollListener) {
			window.scrollListener = setTimeout(() => {
				let t2 =
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				if (t2 > this.t1) {
					this.setState({ showHeader: false });
				} else if (t2 < this.t1) {
					this.setState({ showHeader: true });
				}
				clearTimeout(window.scrollListener);
				window.scrollListener = null;
				this.t1 = t2;
			}, 100);
		}
	};
	componentDidMount() {
		this.activeMonitor();
	}
	componentWillUnmount() {
		this.destoryMonitor();
	}
	destoryMonitor() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	activeMonitor() {
		this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
		window.addEventListener("scroll", this.handleScroll);
	}
	render() {
		const { showHeader: subHeader } = this.state;
		const { lang, siteConfig } = this.props;
		return (
			<>
				{subHeader && (
					<div className="app-header Dis(flex) Pos(fixed)">
						<MainHeader lang={lang} siteConfig={siteConfig} />
					</div>
				)}
			</>
		);
	}
}

export default Header;
