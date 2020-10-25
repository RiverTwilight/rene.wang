import * as React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const List = styled.div`
	padding: 0 10px;
	@media (max-width: 1024px) {
		position: fixed;
		top: 20px;
		${(props: { expand: boolean }) => props.expand && ""}
	}
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
	const [expand, setExpand] = React.useState(false);
	const Title = (props, index) => (
		<CataItem
			href={`#${props.title}`}
			key={props.title}
			level={props.level}
		>
			{props.title}
		</CataItem>
	);
	return (
		<Card title="目录">
			<List expand={expand}>{catalog.map(Title)}</List>
		</Card>
	);
};
