import * as React from 'react'
/**
 * 多语言组件
 * 若props包含子节点作为词典Provider，不包含作为Consumer
 */

const { Provider, Consumer } = React.createContext({
    dictionary: {},
    language: null
});

interface Pro {
    dictionary: {
        [dicIndex: string]: {
            [langIndex: number]: string
        }
    };
    language: number;
    children: JSX.Element | JSX.Element[] | null;
}

interface Con {
    [dicIndex: string]: true;
}

export default function Text({ dictionary, language, children, ...props }: Pro | Con): JSX.Element {
    if (children) {
        return (
            <Provider value={{ language, dictionary }}>
                {children}
            </Provider>
        )
    }
    const key = Object.keys(props).filter(item => JSON.stringify(props[item]) === 'true')[0];
    return (
        <Consumer>
            {value => (
                value.dictionary[key][value.language]
            )}
        </Consumer>
    )
}

