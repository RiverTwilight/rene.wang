import React from 'react'
import Head from 'next/head'
import Header from '../layout/header'
import Drawer from '../layout/Drawer'
import '../scss/App.scss'

export default class extends React.Component {
    componentDidMount() {
        const { loading } = this
        window.loadShow = () => loading.style.display = 'inline-block';
        window.loadHide = () => loading.style.display = 'none';
    }
    render() {
        const { config } = this.props;
        return (
            <>
                <Head>
                    <title>{config.title}</title>
                </Head>
                <div ref={r => this.loading = r} style={{ display: 'inline-block' }} className="header-liner"></div>
                <Header />
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
