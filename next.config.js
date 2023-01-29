module.exports = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		sizes: [320, 480, 820, 1200, 1600],
		domains: ["i.loli.net", "bgr.com", "mmbiz.qpic.cn", "s1.ax1x.com"],
	},
	webpack: function (config) {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader",
		});
		config.module.rules.push({
			test: /\.svg$/,
			// issuer: {
			//     test: /\.(js|ts)x?$/,
			// },
			use: ["@svgr/webpack"],
		});
		return config;
	},
	i18n: {
		locales: ["zh-CN", "en-US"],
		defaultLocale: "zh-CN",
	},
	async redirects() {
		return [
			{
				source: "/s/twitter",
				destination: "https://twitter.com/rea1DonandTrump",
				permanent: true
			},
			{
				source: "/s/pixiv",
				destination: "https://www.pixiv.net/en/users/35572742",
				permanent: true
			},
			{
				source: "/rss",
				destination: "https://rene.wang/rss/feed.xml",
				permanent: false
			}
		];
	},
};
