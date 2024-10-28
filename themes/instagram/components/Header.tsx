import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ICurrentPage, ISiteConfig } from "@/types/index";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 16px;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 1.25rem;
	font-weight: 500;
	cursor: pointer;
`;

const IconButton = styled.button<{ isDark?: boolean }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: none;
	background: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => (props.isDark ? "#e8eaed" : "#5f6368")};
	transition: background 0.2s;

	&:hover {
		background: ${(props) => (props.isDark ? "#525355" : "#f1f3f4")};
	}

	svg {
		width: 24px;
		height: 24px;
	}
`;

const MenuButton = styled(IconButton)`
	@media (min-width: 769px) {
		display: none;
	}
`;

const NavLinks = styled.div`
	display: flex;
	gap: 8px;
	margin-left: auto;

	@media (max-width: 768px) {
		display: none;
	}
`;

const NavLink = styled(Link)<{ active?: boolean; isDark?: boolean }>`
	padding: 8px 16px;
	border-radius: 4px;
	color: ${(props) => (props.isDark ? "#e8eaed" : "#5f6368")};
	background: ${(props) =>
		props.active ? (props.isDark ? "#525355" : "#f1f3f4") : "transparent"};
	transition: background 0.2s;

	&:hover {
		background: ${(props) => (props.isDark ? "#525355" : "#f1f3f4")};
	}
`;

interface HeaderProps {
	siteConfig: ISiteConfig;
	currentPage: ICurrentPage;
	lang: string;
	menuItems: Array<{ text: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({
	siteConfig,
	currentPage,
	lang,
	menuItems,
}) => {
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const isDark = false; // You can connect this to your theme context

	return (
		<HeaderContainer>
			<Link href="/" passHref>
				<Logo>
					<img
						src="/icon/apple-icon-76x76.png"
						alt="Logo"
						style={{ width: 24, height: 24 }}
					/>
					{siteConfig.title[lang]}
				</Logo>
			</Link>

			<NavLinks>
				{menuItems.map((item, index) => (
					<NavLink
						key={index}
						href={item.href}
						isDark={isDark}
						active={currentPage.path === item.href}
					>
						{item.text}
					</NavLink>
				))}
			</NavLinks>

			<IconButton
				isDark={isDark}
				as="a"
				href="mailto:contact@example.com"
			>
				<svg viewBox="0 0 24 24">
					<path
						fill="#000"
						d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
					/>
				</svg>
			</IconButton>

			<IconButton
				isDark={isDark}
				as="a"
				href="https://twitter.com/yourusername"
				target="_blank"
			>
				<svg viewBox="0 0 24 24">
					<path
						fill="#000"
						d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
					/>
				</svg>
			</IconButton>
		</HeaderContainer>
	);
};

export default Header;
