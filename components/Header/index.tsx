//@ts-nocheck
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
	CogSharpIcon,
} from "kindyle";
import Text from "../../utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../utils/AcitiveLink";
import { useRouter } from "next/router";
import { ICurrentPage, ISiteConfig } from "../../types";

/**
 * 头部
 */

interface IHeader {
	siteConfig: ISiteConfig;
	currentPage?: ICurrentPage;
	lang?: string;
}

const MainHeader = ({ siteConfig, menuItems, currentPage }: IHeader) => {
	const router = useRouter();
	const pageMenuItems = currentPage.path.match(/\/blog\/.+/)
		? [
				{
					textPrimary: "About This Book",
				},
		  ]
		: [];
	return (
		<Navbar>
			<StatuBar battery={86} deviceName="My Kindle" />
			<ActionBar>
				<ActionGroup>
					<Text dictionary={nav} language="en-US">
						<ActionItem
							onClick={() => {
								router.push("/");
							}}
						>
							<HomeOutlineIcon />
							<Text homePage />
						</ActionItem>
						<ActionItem
							onClick={() => {
								router.back();
							}}
						>
							<ArrowBackSharpIcon />
							BACK
						</ActionItem>
						<ActionItem>
							<CogSharpIcon />
							settings
						</ActionItem>
					</Text>
				</ActionGroup>
				<ActionBarSpace />
				<ActionGroup>
					<SearchBar />
					<ActionBarMenu
						items={[
							...menuItems,
							...pageMenuItems,
							{
								textPrimary: "Github",
								component: "a",
								href: siteConfig.author.github,
							},
							{
								textPrimary: "Twitter",
								component: "a",
								href: siteConfig.author.twitter,
							},
							{
								textPrimary: "Expermintal Browser",
							},
						]}
					/>
				</ActionGroup>
			</ActionBar>
		</Navbar>
	);
};

class Header extends React.Component<
	IHeader,
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
		return <>{subHeader && <MainHeader {...this.props} />}</>;
	}
}

export default Header;
