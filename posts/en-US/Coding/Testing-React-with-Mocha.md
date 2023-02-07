---
title: Using Mocha & chai test you React application
date: 2023/2/5
---

I was recently continuing to develop the [Kindle UI](https://github.com/RiverTwilight/kindle-ui) library and thought it was time to write some tests, so I decided to use the [Mocha](https://mochajs.org/) testing scheme (to try something new).

(This paragraph is generated by GPT 👉) During the development process, it is very important to ensure the accuracy Testing is one of the effective ways to achieve this, especially in JavaScript development. In React application development, Mocha and Chai are two very popular testing frameworks. This article explains how to use Mocha and Chai to test React applications.

## Why not use the official Jest tests recommended by react?

Jest was originally designed for testing react apps. Compared to Jest, Mocha is more flexible (the latter can and must be additionally configured, while the former works out of the box), runs in both browser and node environments, and supports complex statements such as

```js
expect(person.age).to.be.lte(35).and.to.be.gte(18);
```

Since my project is not a single react app but a monorepo, using mocha in the workspace root is definitely a better choice.

PS: *This stack is also used by [MUI](https://github.com/mui/material-ui)*.

## Installing dependencies

Mocha itself does not support JSX, so we need to install a few dependencies.

```bash
yarn add mocha -D

# Babel Plugins
yarn add -W -D @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/register

# Used to render react components, please select corresbonding version which should be same with react.
yarn add react-test-renderer@17.0.2 -D -W
```

> Note: If you are installing test dependencies in the workspace root (the recommended practice), remember to add the -W parameter.

## Configuring Mocha

Create a `.mocharc.js` file in the project root directory with the following contents.

```js
module.exports = {
	extension: ["js", "mjs", "ts", "tsx"],
	ignore: ["**/build/**", "**/node_modules/**"],
	recursive: true,
	reporter: "dot",
	require: [require.resolve("./test/utils/setupBabel")],
	"watch-ignore": [
		".git",
		"**/node_modules/**",
		"**/build/**",
		"docs/.next/**",
	],
};
```

Create a `setupBabel.js` file in the `/test/utils/setupBabel` directory

```js
require("@babel/register")({
	extensions: [".js", ".ts", ".tsx"],
});
```

## Configuring Babel

With babel, we can use test files in cjs format without the annoying `"type": "module"` setting.

```js
// babel.config.js
module.exports = function getBabelConfig(api) {
	const useESModules = api.env(["legacy", "modern", "stable", "rollup"]);

	const presets = [
		[
			"@babel/preset-env",
			{
				browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
				modules: useESModules ? false : "commonjs",
			},
		],
		[
			"@babel/preset-react",
			{
				runtime: "automatic",
			},
		],
		"@babel/preset-typescript",
	];

	const plugins = [];

	return {
		assumptions: {
			noDocumentAll: true,
		},
		presets,
		plugins,
		ignore: [/@babel[\\|/]runtime/],
		overrides: [
			{
				exclude: /\.test\.(js|ts|tsx)$/,
				plugins: ["@babel/plugin-transform-react-constant-elements"],
			},
		],
	};
};
```

## Testing

Add a shortcut script to `package.json`, here please configure it according to the actual project.

```json
"test:unit": "cross-env NODE_ENV=test mocha --config .mocharc.js 'packages/kindle-ui/**/*.test.{mjs,js,ts,tsx}' 'test/utils/**/*.test.{js,ts,tsx}'"
```

After that we can happily write tests.

For more information about the usage of react-test-renderer, you can refer to the [official documentation](https://reactjs.org/docs/test-renderer.html).

Some common testing scenarios are listed here for reference.

### Check component type

```js
import * as React from "react";
import { expect } from "chai";
import renderer from "react-test-renderer";
// It is recommended to use the package processed with "npm link" to ensure that it is close to the actual scenario.
import { ListItem } from "@kindle-ui/core";

describe("<ListItem />", () => {
	describe("prop: component", () => {
		it("renders a div", () => {
			const component = renderer.create(<ListItem />);
			expect(component.toTree().rendered).to.have.property("type", "div");
		});

		it("renders a link", () => {
			const component = renderer.create(
				<ListItem component="a" href="#" />
			);
			expect(component.toTree().rendered).to.have.property("type", "a");
		});
	});
});
```

### Check rendering result

```js
it("render in Container", () => {
	expect(() =>
		renderer.create(
			<Container>
				<ListItem>test</ListItem>
			</Container>
		)
	).not.to.throw();
});
```

## Improvements

The official testing library provided by react is rather limited, for example, we can't test whether an element is visible or not, and we can't simulate a user operating the page.

So, we can use `@testing-library/react` to improve it further.

Note that there is no document object in the node environment, so we need to simulate one using the JSDom library.

Start by adding hooks to mocha.

```js
// .mocharc.js

module.exports = {
    {/**... */}
	beforeEach: () => {
		const dom = new JSDOM("", {
			pretendToBeVisual: true,
			url: "http://localhost",
		});
		global.window = dom.window;
	},
};
```

Update your test code：

```js
import { queries, within } from "@testing-library/react/pure";

describe("general rendering", async () => {
	it("render in Container", async () => {
		render(<ListItem>KindleUI</ListItem>);

		expect(
			within(document.body, { ...queries })
				.getByRole("ListItem")
				.toHaveTextContent("KindleUI")
		).to.be(true);
	});
});
```

You can explore further such as using User Event. Happy testing! ♥