import * as React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Switch = styled.button`
	@media (min-width: 1024px) {
		display: none;
	}
	@media (max-width: 1024px) {
		position: fixed;
		bottom: 50px;
		right: 50px;
		
	}
`;

const Warpper = styled.div`
	@media (max-width: 1024px) {
		position: fixed;
		top: 56px;
		left: 0;
		right: 0;
		max-height: 300px;
		overflow-y: scroll;
		transition: all .3s;
		${(props: { collapse: boolean }) => props.collapse && "top: -310px;"}
	}
`;

const List = styled.div`
	padding: 0 10px;
`;

const CataItem = styled.a`
	padding-left: ${(props: { level?: number }) =>
		props.level && `${12 * props.level}px`};
	padding-top: 5px;
	display: block;
	padding-bottom: 5px;
	cursor: pointer;
	width: 100%;
	font-weight: bold;
	&:hover {
		background: #f6f6f6;
		// color: #43b155;
	}
`;

export default ({
	catalog,
}: {
	catalog: {
		title: string;
		level: number;
	}[];
}) => {
	const [collapse, setCollapse] = React.useState(true);
	const Title = (props, index) => (
		<CataItem
			href={`#${props.title}`}
			key={props.title}
			level={props.level}
		>
			{props.title}
		</CataItem>
	);
	const handleClick = () => {
		setCollapse(!collapse);
	};
	return (
		<>
			<Warpper collapse={collapse}>
				<Card title="目录">
					<List>{catalog.map(Title)}</List>
				</Card>
			</Warpper>
			<Switch onClick={handleClick}>目录</Switch>
		</>
	);
};
