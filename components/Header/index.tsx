import * as React from "react";
import {
	ActionGroup,
	ArrowBackSharpIcon,
	ActionItem,
	ActionBarSpace,
	Navbar,
	SearchBar,
	StatuBar,
	ActionBar,
	ActionBarMenu,
	HomeOutlineIcon,
	CogSharpIcon
} from "kindyle";
import Text from "../../utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../utils/AcitiveLink";
import { useRouter } from 'next/router'

/**
 * 头部
 * @todo 分离各个组件rr
 */

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

const MainHeader = ({ siteConfig }) => {
	const router = useRouter()
	return (
		<Navbar>
			<StatuBar battery={86} deviceName="My Kindle" />
			<ActionBar>
				<ActionGroup>
					<ActionItem onClick={() => {
						router.push('/')
					}}>
						<HomeOutlineIcon />
						home
					</ActionItem>
					<ActionItem onClick={() => {
						router.back()
					}}>
						<ArrowBackSharpIcon />
						BACK
					</ActionItem>
					<ActionItem>
						<CogSharpIcon />
						settings
					</ActionItem>
				</ActionGroup>
				<ActionBarSpace />
				<ActionGroup>
					<SearchBar />
					<ActionBarMenu
						items={[
							{
								textPrimary: "Github",
								component: "a",
								href: siteConfig.author.twitter
							},
							{
								textPrimary: "Expermintal Browser",
							},
						]}
					/>
				</ActionGroup>
			</ActionBar>
		</Navbar>
	)
}

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
					<MainHeader siteConfig={siteConfig} />
				)}
			</>
		);
	}
}

export default Header;
