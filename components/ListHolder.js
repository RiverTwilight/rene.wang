import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => {
	if (window.innerWidth <= 640) {
		return (
			<ContentLoader
				speed={2}
				width={800}
				height={201}
				viewBox="0 0 800 201"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="1" y="63" rx="3" ry="3" width="162" height="90" />
				<rect x="0" y="26" rx="0" ry="0" width="260" height="25" />
				<rect x="170" y="68" rx="0" ry="0" width="150" height="15" />
				<rect x="170" y="93" rx="0" ry="0" width="150" height="15" />
				<rect x="170" y="118" rx="0" ry="0" width="150" height="15" />
				<rect x="170" y="143" rx="0" ry="0" width="100" height="15" />
			</ContentLoader>
		)
	}
	return (
		<ContentLoader
			speed={2}
			width={800}
			height={201}
			viewBox="0 0 800 201"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="1" y="63" rx="3" ry="3" width="180" height="105" />
			<rect x="0" y="26" rx="0" ry="0" width="260" height="25" />
			<rect x="194" y="68" rx="0" ry="0" width="420" height="15" />
			<rect x="194" y="92" rx="0" ry="0" width="420" height="15" />
			<rect x="194" y="119" rx="0" ry="0" width="420" height="15" />
			<rect x="194" y="145" rx="0" ry="0" width="256" height="15" />
		</ContentLoader>
	)
}
export default MyLoader