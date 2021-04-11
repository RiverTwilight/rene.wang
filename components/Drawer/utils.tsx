import React from "react";
import PersonIcon from "../../public/static/icon/person-outline";
import Ygktool from "../../public/static/ygktool_logo.svg";
import "./Drawer.scss";

const Headmaster = ({
	config: { name, image, intro },
}: {
	config: ISiteConfig["author"];
}) => {
	return (
		<div className="our-headmaster card Br(30px)">
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
		<div className="card-menu Dis(flex) Bgc(white) Br(30px) card">
			{[
				{
					text: "云极客工具",
					icon: <Ygktool />,
					href: "https://www.ygktool.cn",
				},
			].map((item) => (
				<a key={item.text} href={item.href} className="Dis(flex) card-menu-item">
					{item.icon}
					<div className="card-menu-item-text">{item.text}</div>
				</a>
			))}
		</div>
	);
};

export { CardMenu, Headmaster };
