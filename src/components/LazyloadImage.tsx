import * as React from "react";
import Image from "next/image";

export default ({ src, alt }: { src: string; alt?: string }) => {
	const [paddingTop, setPaddingTop] = React.useState("0");

	return (
		<>
			<figure
				role="group"
				style={{
					position: "relative",
					paddingTop,
				}}
			>
				<Image
					src={src}
					layout="fill"
					objectFit="contain"
					aria-describedby=""
					onLoad={({ target }) => {
						const { naturalWidth, naturalHeight } =
							target as HTMLImageElement;
						setPaddingTop(
							`calc(100% / (${naturalWidth} / ${naturalHeight})`
						);
					}}
				/>

				{alt && (
					<div className="Texta(center)">
						{alt}
					</div>
				)}
			</figure>
		</>
	);
};
