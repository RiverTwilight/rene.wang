import React, { useState } from "react";
import Image from "next/image";

interface ImageBlockProps {
	node: any;
	alt: string;
	src: string;
}

type NonArticleUsageProps = Pick<ImageBlockProps, "node">;

type ArticleUsageProps = Pick<ImageBlockProps, "src" | "alt">;

const ImageBlock = (props: ArticleUsageProps | NonArticleUsageProps) => {
	const [paddingTop, setPaddingTop] = useState("0%");

	let src: string;
	let alt: string;

	// Type guard to check if 'node' is present in props
	if ("node" in props) {
		// Props are of type NonArticleUsageProps
		src = props.node?.properties?.src;
		alt = props.node?.properties?.alt;
	} else {
		// Props are of type ArticleUsageProps
		src = props.src;
		alt = props.alt;
	}

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
				fill
				style={{ objectFit: "contain" }}
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
