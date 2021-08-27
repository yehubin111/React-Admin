import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./layout.module.scss";
import defaultConfig from "defaultConfig";
import { wrapContext } from "utils/context";

import { Layout, Drawer } from "antd";
import ContentLayout from "./ContentLayout";
import MenuNav from "./components/MenuNav";
import TopInfo from "./components/TopInfo";
import ThemeTitle from "./components/ThemeTitle";

const { Header, Sider, Content, Footer } = Layout;
const { copyright, navLogo, showCopyright } = defaultConfig;

class BasicLayout extends Component {
  state = {
    collapsed: false
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
                    collapsed={false}
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
                style={{ marginLeft: !isMobile && isSide ? "200px" : "0px" }}
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

export default withRouter(BasicLayout);
