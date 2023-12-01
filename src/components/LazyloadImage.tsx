import React, { useState } from "react";
import Image from "next/image";

const ImageBlock = ({ node }) => {
	const [paddingTop, setPaddingTop] = useState("0%");

	// Extracting src and alt from node properties
	const { src, alt } = node.properties;

	return (
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
				alt={alt}
				onLoad={({ target }) => {
					const { naturalWidth, naturalHeight } =
						target as HTMLImageElement;
					setPaddingTop(
						`calc(100% / (${naturalWidth} / ${naturalHeight}))`
					);
				}}
			/>

			{alt && <figcaption className="Texta(center)">{alt}</figcaption>}
		</figure>
	);
};

export default ImageBlock;
