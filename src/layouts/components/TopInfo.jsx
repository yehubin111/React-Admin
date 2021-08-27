import React, { Component, i18nLocale, t } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styles from './comp.module.scss';
import defaultConfig from "defaultConfig";
import { toLoginOut, saveLang } from "redux/actions";

import { Dropdown, Menu, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, ExportOutlined, EditOutlined, GlobalOutlined } from '@ant-design/icons';
import ModifyPassword from "./ModifyPassword";
import MenuNav from "./MenuNav";

const { mainLogo, navLogo, avatar } = defaultConfig;

class TopInfo extends Component {
    state = {
        visible: false,
        count: 0
    }
    interval = null
    componentDidMount() {
    }
    componentWillUnmount() {
        if (this.interval)
            clearInterval(this.interval);
    }
    toLoginOut() {
        const { toLoginOut, location, history } = this.props;

        // 删除token
        toLoginOut();
        let redirect = location.pathname;
        history.push("/base/login?redirect=" + encodeURIComponent(redirect));
    }
    render() {
        const { onMenu, collapsed, userInfo, isMobile, isSide, isDark, routes, langList, locale, saveLang, history } = this.props;
        const { count } = this.state;

        const userMenu = (
            <Menu>
                <Menu.Item key="1">
                    <p className={styles.downmenu} onClick={() => {
                        this.setState({
                            visible: true
                        })
                    }}><EditOutlined /> {t('layouts.TopInfo.changePassword')}</p>
                </Menu.Item>
                <Menu.Item key="2">
                    <p className={styles.downmenu} onClick={this.toLoginOut.bind(this)}><ExportOutlined /> {t('layouts.TopInfo.logout')}</p>
                </Menu.Item>
            </Menu>
        )
        // 国际化下拉选择
        const globalMenu = (
            <Menu selectable selectedKeys={[locale]} onSelect={e => {
                saveLang(e.key);
                // i18next改变语言
                i18nLocale(e.key);
            }}>
                {
                    langList.map(lang => (
                        <Menu.Item key={lang.value}>
                            <p className={styles.downmenu}>{lang.icon}&nbsp;&nbsp;{lang.label}</p>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
        return (
            <div className={`rf jsb ac ${styles.top}`}>
                {isMobile ? <div className={`rf ac ${styles.left}`}>
                    <img className={styles.logo} src={mainLogo} alt="" />
                    {
                        isMobile && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.menu,
                            onClick: onMenu
                        })
                    }
                </div> : (
                    !isSide
                        ? <div className={`rf ac ${styles.left}`}>
                            <img className={styles.logo} src={navLogo} style={{marginRight: "30px"}} alt="" />
                            <MenuNav routes={routes} mode="horizontal" theme={isDark && 'dark'} />
                        </div>
                        : <span></span>
                )}
                <div className={`rf ac ${styles.right}`}>
                    <Dropdown overlay={userMenu}>
                        <p className={`rf ac ${styles.head}`}>
                            <Avatar className={styles.face} src={userInfo.avatar ? userInfo.avatar : avatar} size={24} />
                            <span className={`${styles.user} ${!isSide && isDark && styles['dark-user']}`}>{t('layouts.TopInfo.hello')}{userInfo.userName}</span>
                        </p>
                    </Dropdown>
                    {/* <Dropdown overlay={globalMenu}>
                        <p className={styles.global}>
                            <GlobalOutlined className={!isSide && isDark && 'dark-global'} />
                        </p>
                    </Dropdown> */}
                </div>
                <ModifyPassword visible={this.state.visible} onCancel={() => {
                    this.setState({
                        visible: false
                    })
                }} onOk={this.toLoginOut.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        langList: state.langList
    }
}

export default connect(mapStateToProps, { toLoginOut, saveLang })(withRouter(TopInfo));