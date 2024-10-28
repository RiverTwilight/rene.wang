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
			<MenuButton isDark={isDark}>
				<svg viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
					/>
				</svg>
			</MenuButton>

			<Link href="/" passHref>
				<Logo>
					<img
						src="/favicon.ico"
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

			<IconButton isDark={isDark}>
				<svg viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
					/>
				</svg>
			</IconButton>
		</HeaderContainer>
	);
};

export default Header;
