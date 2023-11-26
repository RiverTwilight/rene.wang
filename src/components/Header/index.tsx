import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	ActionGroup,
	ArrowBackSharpIcon,
	ActionItem,
	ActionBarSpace,
	Navbar,
	Dialog,
	DialogContent,
	DialogAction,
	SearchBar,
	StatuBar,
	Button,
	ActionBar,
	ActionBarMenu,
	HomeOutlineIcon,
	CogSharpIcon,
	DialogTitle,
} from "@kindle-ui/core";
import Text from "../../utils/i18n";
import { nav, navbarMenu } from "../../i18n.json";
import { ICurrentPage, ISiteConfig } from "@/types/index";

interface HeaderProps {
	siteConfig: ISiteConfig;
	currentPage?: ICurrentPage;
	lang?: string;
	containerEle: any;
	menuItems?: any[];
}

const Header: React.FC<HeaderProps> = ({
	siteConfig,
	menuItems,
	currentPage,
	containerEle,
	lang,
}) => {
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	var pageMenuItems = [];
	if (currentPage.path) {
		if (currentPage.path.match(/\/blog\/.+/)) {
			pageMenuItems.push({
				textPrimary: "About This Book",
			});
		} else if (currentPage.path.match(/\/blog\/.+/)) {
			// ...
		}
	}

	useEffect(() => {
		if (screen.width > 768 && currentPage.path.match(/\/p\/.+/)) {
			const handleScroll = () => {
				const container = document.querySelector(".content");

				const currentScrollPos = container.scrollTop;

				console.log(currentScrollPos);

				const visible =
					prevScrollPos > currentScrollPos || currentScrollPos < 10;
				setVisible(visible);
				setPrevScrollPos(currentScrollPos);
			};

			const container = document.querySelector(".content");

			container.addEventListener("scroll", handleScroll);

			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [prevScrollPos, currentPage]);

	if (!visible) return <div style={{ height: "84px" }}></div>;

	return (
		<Navbar autoClose fixed>
			<StatuBar
				celluar={{
					on: true,
					label: "LTE",
					siginal: 3,
				}}
				battery={86}
				deviceName={`${currentPage ? `${currentPage.title} - ` : ""}${
					siteConfig.title[lang]
				}`}
			/>
			<ActionBar>
				<ActionGroup>
					<Text dictionary={nav} language="en-US">
						<ActionItem
							onClick={() => {
								router.push("/");
							}}
							changeFill={false}
						>
							<HomeOutlineIcon />
							<Text homePage />
						</ActionItem>
						<ActionItem
							onClick={() => {
								router.back();
							}}
							changeFill={false}
						>
							<ArrowBackSharpIcon />
							BACK
						</ActionItem>
						<ActionItem
							onClick={() => {
								router.push("/settings");
							}}
						>
							<CogSharpIcon />
							settings
						</ActionItem>
					</Text>
				</ActionGroup>
				<ActionBarSpace />
				<ActionGroup>
					<SearchBar />
					<Dialog
						anchorEl={containerEle.current}
						open={open}
						onClose={handleClose}
					>
						<DialogTitle>About</DialogTitle>
						<DialogContent>
							{siteConfig.author.intro[0].content}
						</DialogContent>
						<DialogAction>
							<Button
								variant="secondary"
								onClick={() => {
									window.open("mailto://contact@rene.wang");
								}}
							>
								Email me
							</Button>
						</DialogAction>
					</Dialog>
					<Text dictionary={navbarMenu} language={lang}>
						<ActionBarMenu
							items={[
								...menuItems,
								...pageMenuItems,
								// {
								// 	textPrimary: "Friends",
								// 	onClick: () => {
								// 		router.push("/special");
								// 	},
								// },
								{
									textPrimary: "Github",
									component: "a",
									href: siteConfig.author.github,
								},
								{
									textPrimary: "Pixiv",
									component: "a",
									href: siteConfig.author.pixiv,
								},
								{
									textPrimary: "Twitter",
									component: "a",
									href: siteConfig.author.twitter,
								},
								{
									textPrimary: <Text about />,
									onClick: handleClick,
								},
							]}
						/>
					</Text>
				</ActionGroup>
			</ActionBar>
		</Navbar>
	);
};

export default Header;
