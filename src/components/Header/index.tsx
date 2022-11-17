import * as React from "react";
import MainHeader from "./MainHeader";

/**
 * 头部
 *  FIXME 文章回首页头部隐藏
 */

class Header extends React.Component<
	IHeader,
	{
		showHeader: boolean;
	}
> {
	t1 = 0;
	constructor(props: any) {
		super(props);
		this.state = {
			showHeader: true,
		};
	}
	handleScroll = () => {
		if (!window.scrollListener) {
			window.scrollListener = setTimeout(() => {
				let t2 =
					document.documentElement.scrollTop ||
					document.body.scrollTop;

				if (t2 < 120) {
					this.setState({ showHeader: true });
				} else if (t2 > this.t1) {
					this.setState({ showHeader: false });
				} else if (t2 < this.t1) {
					this.setState({ showHeader: true });
				}
				clearTimeout(window.scrollListener);
				window.scrollListener = null;
				this.t1 = t2;
			}, 100);
		}
	};
	componentDidMount() {
		this.initialMonitor();
	}
	componentDidUpdate() {
		this.initialMonitor();
	}
	componentWillUnmount() {
		this.destoryMonitor();
	}
	initialMonitor() {
		const { currentPage } = this.props;
		if (currentPage.path && currentPage.path.match(/\/blog\/.+/)) {
			this.activeMonitor();
		} else {
			this.destoryMonitor();
		}
	}
	destoryMonitor() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	activeMonitor() {
		this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
		window.addEventListener("scroll", this.handleScroll);
	}
	render() {
		const { showHeader: subHeader } = this.state;
		return <>{subHeader && <MainHeader {...this.props} />}</>;
	}
}

export default Header;
