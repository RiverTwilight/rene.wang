import Kindle_HomePage from "@/themes/kindle/pages/HomePage";
import Kindle_ArticlePage from "@/themes/kindle/pages/ArticlePage";
import Kindle_ArchivePage from "@/themes/kindle/pages/ArchivePage";
import Kindle_SettingsPage from "@/themes/kindle/pages/SettingsPage";
import Kindle_Layout from "@/themes/kindle/Layout";

import Instagram_Layout from "@/themes/instagram/Layout";
import Instagram_HomePage from "@/themes/instagram/pages/HomePage";
import Instagram_ArticlePage from "@/themes/instagram/pages/ArticlePage";
import Instagram_ArchivePage from "@/themes/instagram/pages/ArchivePage";
import Instagram_SettingsPage from "@/themes/instagram/pages/SettingsPage";

const THEME_NAME = "instagram";

const themeConfig = {
	kindle: {
		siteConfig: {
			title: {
				"zh-CN": "Rene Wang 的个人网站",
				"en-US": "Rene's Official Website",
			},
		},
		layout: Kindle_Layout,
		homePage: Kindle_HomePage,
		articlePage: Kindle_ArticlePage,
		archivePage: Kindle_ArchivePage,
		settingsPage: Kindle_SettingsPage,
	},
	instagram: {
		siteConfig: {
			title: {
				"zh-CN": "Rika Li 的个人网站",
				"en-US": "Rika's Official Website",
			},
		},
		layout: Instagram_Layout,
		homePage: Instagram_HomePage,
		articlePage: Instagram_ArticlePage,
		archivePage: Instagram_ArchivePage,
		settingsPage: Instagram_SettingsPage,
	},
};

if (!THEME_NAME || !themeConfig[THEME_NAME]) {
	throw new Error(`Invalid THEME_NAME: ${THEME_NAME}`);
}

export default themeConfig[THEME_NAME];
