//@ts-nocheck
import * as React from "react";
import ReactMarkdown from "react-markdown";
// import CodeBlock from '../components/CodeBlock'
import Link from "next/link";
import Image from "next/image";
import Text from "../../utils/i18n";
import { postItem } from "../../data/i18n.json";
//  '../scss/typo.scss'

/**
 * 单个文章组件
 */

export default ({
	id,
	title,
	cover,
	summary,
	date,
	lang,
}: Readonly<{
	title: string;
	summary: string;
	id: string;
	/**封面 */
	cover?: string;
	date?: string;
	lang?: string;
}>) => {
	// const [expand, setExpand] = React.useState(false);
	return (
		<div key={id} className={"passage-item"}>
			<div className="passage-item-header Dis(flex)">
				<Link href={"/blog/" + id} locale={lang}>
					<a className="passage-item-header-title Cur(pointer)">
						{title.replace("&nbsp;", " ")}
					</a>
				</Link>
				<meta
					itemProp="url"
					content={`https://ygk-blog.yunser.com/blog/${id}`}
				/>
				<meta itemProp="name" content={title} />
				<div className="passage-item-header-date Textc(secondary)">
					{date}
				</div>
			</div>
			<div
				className={`passage-item-content Textc(secondary):h ${"passage-item-content-close Dis(flex)"}`}
			>
				{cover && (
					<div className="passage-item-content-cover">
						<div className="passage-item-content-cover-inner">
							<Image
								unsized
								alt={title.replace("&nbsp;", " ")}
								src={cover}
							/>
						</div>
					</div>
				)}
				{/*<div className="typo passage-item-content-text">
                    {expand ? <ReactMarkdown
                        renderers={{
                            code: CodeBlock
                        }}
                        escapeHtml={false}
                        source={summary}>
                    </ReactMarkdown> : summary.replace(/\<[^\>]+\>/g, '')}
                </div>*/}
				<Link href={"/blog/" + id} locale={lang}>
					<div className="passage-item-content-text Cur(pointer) Overf(hidden)">
						<ReactMarkdown allowedTypes={["paragraph", "text"]}>
							{summary.replace(/\<[^\>]+\>/g, "")}
						</ReactMarkdown>
					</div>
				</Link>
			</div>
			{/*<div onClick={() => {
                setExpand(!expand);
                if (expand) {
                    window.location.hash = String(id)
                }
            }} className={`passage-item-action ${expand ? 'passage-item-action-sticky' : ''}`}>
                <span className="passage-item-readmore">{expand ? "收起" : "展开全文"}</span>
            </div>*/}
			<Text dictionary={postItem} language={lang}>
				<div className={`passage-item-action Dis(flex)`}>
					<Link href={"/blog/" + id} locale={lang}>
						<a className="passage-item-readmore Textc(primary)">
							<Text showMore />
						</a>
					</Link>
				</div>
			</Text>
		</div>
	);
};
