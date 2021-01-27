import React from "react";
import PersonIcon from "../../static/icon/person-outline";
import Ygktool from "../../static/ygktool_logo.svg";
import "./Drawer.scss";

const Headmaster = ({
	config: { name, image, intro },
}: {
	config: ISiteConfig["author"];
}) => {
	return (
		<div className="our-headmaster card br-all">
			{/*<img loading="lazy" className="lijun" src={image} />*/}
			<div className="headmaster-title">
				<PersonIcon />
				&nbsp;&nbsp;{name}
			</div>
			<div className="headmaster-content">
				{intro.map(
					(int: {
						title: React.ReactNode;
						content: React.ReactNode;
					}) => (
						<>
							<div className="headmaster-content-title">
								{int.title}:
							</div>
							<div className="headmaster-content-text">
								{int.content}
							</div>
						</>
					)
				)}
			</div>
		</div>
	);
};

const CardMenu = () => {
	return (
		<div className="card-menu br-all card">
			{[
				{
					text: "云极客工具",
					icon: <Ygktool />,
					href: "https://www.ygktool.cn",
				},
			].map((item) => (
				<a key={item.text} href={item.href} className="card-menu-item">
					{item.icon}
					<div className="card-menu-item-text">{item.text}</div>
				</a>
			))}
		</div>
	);
};

export { CardMenu, Headmaster };
