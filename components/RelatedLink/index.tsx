//@ts-nocheck
import * as React from "react";
import MainHeader from "./MainHeader";

/**
 * 头部
 */

const Links = () => linkList.map((link, i)=>(<a>{link.text}</a>))

const RelatedLink = () => {
	return <div className="P(10px) Textc(secondary)">Related Links: </div>;
};

export default RelatedLink;
