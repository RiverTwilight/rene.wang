import styled from "styled-components";

export const StyledGrid = styled.div`
	columns: 3;
	column-gap: 12px;
	padding: 16px;
	max-width: 1200px;
	margin: 0 auto;

	& > * {  // This targets direct children
		margin-bottom: 12px;
		break-inside: avoid;
		display: inline-block;
		width: 100%;
	}

	@media (max-width: 1280px) {
		columns: 3;
	}

	@media (max-width: 1024px) {
		columns: 2;
	}

	@media (max-width: 640px) {
		columns: 1;
	}
`;

export const StyledCard = styled.div`
	background: white;
	border-radius: 16px;
	cursor: pointer;
	transition: box-shadow 0.2s ease-in-out;
	padding: 16px;
	position: relative;
	overflow: hidden;
	border: 2px solid black;

	&:hover {
		background: rgba(255, 255, 255, 0.5);
	}
`;

export const CardTitle = styled.h3`
	margin: 0;
	font-size: 1rem;
	font-weight: 500;
	color: #202124;
	line-height: 1.5;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const CardDate = styled.div`
	color: #5f6368;
	font-size: 0.75rem;
	margin-top: 12px;
`;

export const Section = styled.section`
	margin: 24px auto;
	max-width: 1200px;
	padding: 0 6px;
	padding-bottom: 50vh;
`;

export const SectionTitle = styled.h2`
	font-size: 1.25rem;
	font-weight: 500;
	margin-bottom: 16px;
	color: #202124;
	padding: 0 16px;
`;

export const TabContainer = styled.div`
	display: flex;
	gap: 8px;
	overflow-x: auto;
	padding: 8px 14px;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const TabButton = styled.button<{ active: boolean }>`
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 12px;
	background: ${(props) => (props.active ? "#e8f0fe" : "transparent")};
	color: ${(props) => (props.active ? "#1a73e8" : "#5f6368")};
	cursor: pointer;
	white-space: nowrap;
	transition: all 0.2s ease;
	font-size: 0.875rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: ${(props) => (props.active ? "#e8f0fe" : "#f1f3f4")};
	}
`;

export const CenteredButton = styled.button`
	padding: 8px 24px;
	border: none;
	border-radius: 12px;
	background: none;
	color: black;
	text-decoration: underline;
	text-align: center;
	font-size: 1.15rem;
	font-weight: 500;

	&:hover {
		cursor: pointer;
	}
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 24px;
`;

export const CarouselContainer = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
`;

export const CarouselTrack = styled.div`
	display: flex;
	gap: 20px;
	padding: 20px;
	overflow-x: auto;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

export const CarouselCard = styled(StyledCard)`
	min-width: 300px;
	flex: 0 0 auto;
	height: 400px;
	position: relative;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-5px);
	}
`;

export const CardContent = styled.div`
	padding: 15px;
`;
