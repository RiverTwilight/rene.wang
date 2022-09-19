import React, { useState } from "react";
import { Tab, TabItem } from "kindle-ui";
import Text from "../../utils/i18n";

type TTabs = {
	[tabName: string]: {
		[langIndex: string]: string;
	};
};

const HomeTab = ({
	onChange,
	tabs,
	activeIndex,
	lang,
}: {
	onChange(index: keyof TTabs): void;
	activeIndex: keyof TTabs;
	tabs: TTabs;
	lang?: string;
}) => {
	const tabEles = Object.keys(tabs).map((tab) => {
		let textProp = {
			[tab]: true,
		};
		return {
			text: <Text {...textProp} />,
			tabName: tab,
		};
	});
	return (
		<Tab>
			<Text language={lang} dictionary={tabs}>
				{tabEles.map((tab) => (
					<TabItem
						key={tab.tabName}
						onClick={() => {
							onChange(tab.tabName);
						}}
						active={activeIndex === tab.tabName}
					>
						{tab.text}
					</TabItem>
				))}
			</Text>
		</Tab>
	);
};

export default HomeTab;
