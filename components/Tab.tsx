import React, { useState } from 'react'
import Text from '../utils/i18n'
import '../scss/tab.scss'

type tabsType = {
    [tabName: string]: {
        [langIndex: string]: string
    }
}

export default ({ onChange, tabs, activeIndex }: {
    onChange(index: keyof tabsType): void;
    activeIndex: keyof tabsType;
    tabs: tabsType
}) => {
    const [extandTab, setExtandTab] = useState(false);
    const tabEles = Object.keys(tabs).map(tab => {
        let textProp = {
            [tab]: true
        }
        return {
            text: <Text {...textProp} />,
            tabName: tab
        }
    });
    return (
        <div className="header-tab card">
            <nav className={`tab ${extandTab ? 'tab-extend' : ''}`}>
                <Text language={0} dictionary={tabs}>
                    {tabEles.map(tab => (
                        <a
                            onClick={_ => {
                                onChange(tab.tabName)
                            }}
                            className={activeIndex === tab.tabName ? 'tab-active' : ''}>
                            {tab.text}
                        </a>
                    ))}
                </Text>
            </nav>
            <button
                className="tab-showmore"
                onClick={() => {
                    setExtandTab(!extandTab)
                }}
            >
                {!extandTab ? '显示更多' : '收起更多'}
            </button>
        </div>
    )
}
