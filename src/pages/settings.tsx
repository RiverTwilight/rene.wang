import { TLocale } from "@/types/index";
import themeConfig from "theme.config";

export async function getStaticProps({ locale, locales }) {
	return {
		props: {
			currentPage: {
				title: "设置",
				path: "/settings",
			},
			locale,
		},
	};
}

interface HomePageProps {
	locale: TLocale;
}

export default (props: HomePageProps) => {
	const SettingsPage = themeConfig.settingsPage;

	return <SettingsPage {...props} />;
};
