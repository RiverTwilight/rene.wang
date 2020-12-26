import * as React from "react";
import styled from "styled-components";

const Card = styled.div`
	background: #fff;
	margin-bottom: 10px;
	.image {
		object-fit: cover;
		width: 100%;
	}
	.title {
		display: flex;
		padding: 5px 8px;
		font-size: 17px;
		border-bottom: 1px solid #e5f2ff;
	}
	.content {
		padding: 5px 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		.content-text {
			padding-left: 5px;
			min-width: 200px;
			color: #888888;
		}
		.content-title {
			font-weight: bold;
		}
	}
`;

export default ({
	icon,
	title,
	children,
}: {
	icon?: any;
	children?: any;
	title?: string;
}) => (
	<Card className="card">
		<div className="title">
			{icon}&nbsp;&nbsp;{title}
		</div>
		<div className="content">{children}</div>
	</Card>
);
