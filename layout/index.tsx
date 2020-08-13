import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Drawer from './Drawer'
import '../scss/App.scss'

class Layout extends React.Component<{
    config: ISiteConfig,
    allPosts: IPost[],
    currentPage: ICurrentPage
}> {
    render() {
        const { config, allPosts, currentPage } = this.props;
        return (
            <>
                <Head>
                    <title>{`${currentPage ? (`${currentPage.text} - `): ''}${config.title}`}</title>
                </Head>
                <div style={{ display: 'inline-block' }} className="header-liner"></div>
                <Header {...this.props} />
                <main className="main">
                    <div className="container">
                        <div className="container-left">
                            {this.props.children}
                        </div>
                        <div className="container-right">
                            <Drawer config={config} />
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Layout
