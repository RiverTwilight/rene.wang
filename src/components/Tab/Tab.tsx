import React, { useState } from "react";
import { Tab, TabItem } from "kindle-ui";
import Text from "../../utils/i18n";

type TTab = {
	name: string;
	text: string;
};

const HomeTab = ({
	onChange,
	tabs,
	activeIndex,
	lang,
}: {
	onChange(index: keyof TTab): void;
	activeIndex: keyof TTab;
	tabs: TTab[];
	lang?: string;
}) => {
	return (
		<Tab>
			{tabs.map((tab) => (
				<TabItem
					key={tab.name}
					onClick={() => {
						onChange(tab.name);
					}}
					active={activeIndex === tab.name}
				>
					{tab.text}
				</TabItem>
			))}
		</Tab>
	);
};

export default HomeTab;
