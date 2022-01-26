import * as React from "react";
import Image from "next/image";

// TODO 图片N响应式设计

export default ({ src, alt }: { src: string; alt?: string }) => {
	return (
		<>
			<Image width="100" height="300" alt={alt} src={src} />
			{alt && <div className="typo-img-caption">{alt}</div>}
		</>
	);
};
