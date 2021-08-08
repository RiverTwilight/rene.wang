import * as React from "react";
import { TDictionary } from "../types"

/**
 * 多语言组件
 * @author rivertwilight
 * 若props包含子节点作为词典Provider，不包含作为Consumer
 */

const { Provider, Consumer } = React.createContext({
	dictionary: {},
	language: null,
});

interface Pro {
	dictionary: TDictionary;
	language: string;
	children: JSX.Element | JSX.Element[] | null;
}

interface Con {
	[dicIndex: string]: true;
}

export default function Text({
	dictionary,
	language,
	children,
	...props
}: Pro | Con): JSX.Element {
	if (children) {
		return <Provider value={{ language, dictionary }}>{children}</Provider>;
	}
	const key = Object.keys(props).filter(
		(item) =>
			Object.prototype.toString.call(props[item]) ===
				"[object Boolean]" ||
			Object.prototype.toString.call(props[item]) === "[object Array]"
	)[0];
	return (
		<Consumer>
			{(value) => {
				if (
					Object.prototype.toString.call(props[key]) ===
					"[object Array]"
				) {
					let templeStr = value.dictionary[key][value.language];
					let i = 0;
					while (templeStr.match(/\%s/)) {
						templeStr = templeStr.replace(/\%s/, props[key][i]);
						i++;
					}
					return templeStr;
				}
				return value.dictionary[key][value.language];
			}}
		</Consumer>
	);
}
