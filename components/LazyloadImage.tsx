import * as React from "react";
import Image from "next/image";

export default ({ src, alt }: { src: string; alt?: string }) => {
	return (
		<>
			<div
				style={{
					position: "relative",
					width: "100%",
					paddingBottom: "20%",
				}}
			>
				<Image layout="fill" objectFit="contain" alt={alt} src={src} />

				{alt && <div className="typo-img-caption">{alt}</div>}
			</div>
		</>
	);
};
