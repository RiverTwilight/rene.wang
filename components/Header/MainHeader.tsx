import React, { useState } from "react";
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
} from "kindyle";
import Text from "../../utils/i18n";
import { nav, menu } from "../../i18n.json";
import { useRouter } from "next/router";
import { ICurrentPage, ISiteConfig } from "../../types";

interface IHeader {
	siteConfig: ISiteConfig;
	currentPage?: ICurrentPage;
	lang?: string;
	menuItems?: any[];
}

const MainHeader = ({ siteConfig, menuItems, currentPage, lang }: IHeader) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	var pageMenuItems = [];
	if (currentPage.path.match(/\/blog\/.+/)) {
		pageMenuItems.push({
			textPrimary: "About This Book",
		});
	} else if (currentPage.path.match(/\/blog\/.+/)) {
		// ...
	}

	return (
		<Navbar>
			<StatuBar
				battery={86}
				deviceName={`${currentPage ? `${currentPage.title} - ` : ""}${
					siteConfig.title
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
							<Button>CLOSE</Button>
						</DialogAction>
					</Dialog>
					<Text dictionary={menu} language={lang}>
						<ActionBarMenu
							items={[
								...menuItems,
								...pageMenuItems,
								{
									textPrimary: "Friends",
									onClick: () => {
										router.push("/special");
									},
								},
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
