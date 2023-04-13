import React, { useState } from "react";
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
} from "@kindle-ui/core";
import Text from "../../utils/i18n";
import { nav, navbarMenu } from "../../i18n.json";
import { ICurrentPage, ISiteConfig } from "@/types/index";

interface HeaderProps {
	siteConfig: ISiteConfig;
	currentPage?: ICurrentPage;
	lang?: string;
	menuItems?: any[];
}

const MainHeader: React.FC<HeaderProps> = ({
	siteConfig,
	menuItems,
	currentPage,
	lang,
}) => {
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);

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

	return (
		<Navbar fixed>
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
					<Dialog open={open} onClose={handleClose}>
						<DialogContent>
							{siteConfig.author.intro[0].content}
						</DialogContent>
						<DialogAction>
							<Button onClick={handleClose}>CLOSE</Button>
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

export default MainHeader;
