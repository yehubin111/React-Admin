import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./layout.module.scss";
import defaultConfig from "defaultConfig";
import { wrapContext } from "utils/context";
import { debounceFc } from "utils/common";

import { Layout, Drawer } from "antd";
import ContentLayout from "./ContentLayout";
import MenuNav from "./components/MenuNav";
import TopInfo from "./components/TopInfo";
import ThemeTitle from "./components/ThemeTitle";

const { Header, Sider, Content, Footer } = Layout;
const { copyright, navLogo, showCopyright } = defaultConfig;

let resizeFunc;
class BasicLayout extends Component {
  state = {
    prevDevice: '',
    collapsed: false,
    simpleScreenWidth: 992, // 精简版临界宽度
  }
  constructor(props, { device, navType }) {
    super();
    resizeFunc = debounceFc(this.screenResize.bind(this), 300);
    // 设置默认设备
    this.state.prevDevice = device;
    // 设置默认状态
    if (device === 'web' && navType === 'side') {
      const screenWidth = document.body.clientWidth;
      this.state.collapsed = screenWidth < this.state.simpleScreenWidth;
      // this.toInitResize();
    }
  }
  componentDidMount() {
    this.toInitResize();
  }
  componentWillUnmount() {
    // 销毁resize监听事件
    this.toDestoryResize();
  }
  // componentDidUpdate() {
  //   // 设备没改变的情况
  //   if (this.context.device === this.state.prevDevice) return;
  //   this.setState({
  //     prevDevice: this.context.device
  //   })
  //   // 移动端
  //   if (this.context.device === 'h5') {
  //     if (this.state.collapsed)
  //       this.setState({
  //         collapsed: false
  //       })
  //     this.toDestoryResize();
  //   } else {
  //     const screenWidth = document.body.clientWidth;
  //     const collapsed = screenWidth < this.state.simpleScreenWidth;
  //     if (this.state.collapsed !== collapsed)
  //       this.setState({
  //         collapsed: collapsed
  //       })
  //     this.toInitResize();
  //   }
  // }
  toInitResize() {
    window.addEventListener('resize', resizeFunc)
  }
  toDestoryResize() {
    window.removeEventListener("resize", resizeFunc);
  }
  screenResize() {
    const screenWidth = document.body.clientWidth;
    const collapsed = screenWidth < this.state.simpleScreenWidth;
    if (this.state.collapsed !== collapsed) {
      this.setState({
        collapsed
      })
    }
  }
  onClose() {
    this.setState({
      collapsed: false
    })
  }
  render() {
    const { routes, redirectFrom, redirectTo, redirectKey } = this.props;
    const { collapsed } = this.state;
    return (
      <wrapContext.Consumer>
        {({ locale, device, navType, theme }) => {
          const isMobile = device === "h5" ? true : false;
          const isSide = navType === "side" ? true : false;
          const isDark = theme === "dark" ? true : false;
          return (
            <Layout>
              {isMobile
                ? <Drawer
                  placement="left"
                  closable={false}
                  bodyStyle={{
                    padding: 0
                  }}
                  onClose={() => {
                    this.onClose();
                  }}
                  visible={collapsed}
                  width="200"
                >
                  <Sider
                    breakpoint="lg"
                    collapsed={false}
                    trigger={null}
                    className={styles.sider}
                  >
                    <div className={`rf jc ${styles.logo}`}>
                      <img src={navLogo} alt="" />
                    </div>
                    <MenuNav routes={routes} onRoute={() => {
                      this.onClose();
                    }} />
                  </Sider>
                </Drawer>
                : (
                  isSide && <Sider
                    breakpoint="lg"
                    collapsed={collapsed}
                    trigger={null}
                    className={styles.sider}
                  >
                    <div className={`rf jc ${styles.logo}`}>
                      <img src={navLogo} alt="" />
                    </div>
                    <MenuNav routes={routes} />
                  </Sider>
                )
              }
              <Layout
                className={[styles.layout]}
                style={{
                  marginLeft: !isMobile && isSide ? (
                    !collapsed ? "200px" : "80px"
                  ) : "0px"
                }}
              >
                <Header className={`${styles.header} ${!isSide && isDark && styles['top-dark-header']}`}>
                  <TopInfo
                    collapsed={this.state.collapsed}
                    isMobile={isMobile}
                    isSide={isSide}
                    isDark={isDark}
                    locale={locale}
                    routes={routes}
                    onMenu={() => {
                      this.setState({
                        collapsed: !this.state.collapsed
                      });
                    }}
                  />
                </Header>
                <ThemeTitle routes={routes} isMobile={isMobile} />
                <Content className={`${styles.content} ${!isSide && styles['top-content']}`}>
                  <ContentLayout
                    routes={routes}
                    redirectFrom={redirectFrom}
                    redirectTo={redirectTo}
                    redirectKey={redirectKey}
                  />
                </Content>
                {showCopyright && <Footer className={styles.footer}>{copyright}</Footer>}
              </Layout>
            </Layout>
          )
        }}
      </wrapContext.Consumer>
    );
  }
}

BasicLayout.contextType = wrapContext;

export default withRouter(BasicLayout);
