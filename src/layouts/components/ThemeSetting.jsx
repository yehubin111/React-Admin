import React, { useRef, useContext, useState, useEffect } from "react";

import { Drawer, Tooltip, Divider, ConfigProvider, message } from "antd";
import { CloseOutlined, SettingOutlined, CheckOutlined } from "@ant-design/icons";

import styles from "./comp.module.scss";
import defaultConfig from "defaultConfig";
import { wrapContext } from "utils/context";
const { theme } = defaultConfig;

const ThemeConfig = () => {
    const [visible, changeVisible] = useState(false);
    const [themeColor, changeThemeColor] = useState(theme.color);
    const [themeStyle, changeThemeStyle] = useState(theme.style);
    const [themeNavTypeStyle, changeThemeNavTypeStyle] = useState(theme.navType);
    const { onChangeTheme } = useContext(wrapContext);

    const colorList = [
        { color: 'rgb(24, 144, 255)', name: '拂晓蓝' },
        { color: 'rgb(245, 34, 45)', name: '薄暮' },
        { color: 'rgb(250, 84, 28)', name: '火山' },
        { color: 'rgb(250, 173, 20)', name: '日暮' },
        { color: 'rgb(19, 194, 194)', name: '明青' },
        { color: 'rgb(82, 196, 26)', name: '极光绿' },
        { color: 'rgb(47, 84, 235)', name: '极客蓝' },
        { color: 'rgb(114, 46, 209)', name: '酱紫' }
    ]
    const styleList = [
        { style: 'light', name: '亮色' },
        { style: 'dark', name: '暗色' },
    ]
    const navTypeList = [
        { navType: 'side', name: '侧边' },
        { navType: 'top', name: '顶部' },
    ]

    const onChange = () => {
        changeVisible(!visible)
    }
    const onHidden = () => {
        changeVisible(false)
    }
    // 改变主题色
    const hanldeChangeThemeColor = (c) => {
        console.log(c)
        ConfigProvider.config({
            theme: {
                primaryColor: c.color
            }
        })
        changeThemeColor(c.color);
        message.success('主题色已更改为' + c.name)
    }
    // 改变整体风格
    const hanldeChangeThemeStyle = s => {
        onChangeTheme('style', s.style);
        changeThemeStyle(s.style);
        message.success('整体风格已更改为' + s.name)
    }
    // 改变导航模式
    const hanldeChangeThemeNavStyle = n => {
        onChangeTheme('navType', n.navType);
        changeThemeNavTypeStyle(n.navType);
        message.success('导航模式已更改为' + n.name)
    }
    return <div className={styles['theme-config']}>
        {
            React.createElement(Drawer, {
                width: 300,
                visible: visible,
                placement: 'right',
                getContainer: false,
                closable: false,
                onClose: onHidden,
                handler: <div className={styles['theme-mark']} onClick={onChange}>
                    {visible ? <CloseOutlined className={styles['mark-icon']} /> : <SettingOutlined className={styles['mark-icon']} />}
                </div>
            }, <>
                <div className={styles['theme-item']}>
                    <p className={styles['theme-item-title']}>整体风格</p>
                    <div className={`rf ac ${styles['theme-item-list']}`}>
                        {styleList.map(s => <Tooltip placement="top" title={s.name} key={s.style}>
                            <span className={`${styles['theme-item-style']} ${styles['theme-item-style-' + s.style]}`} onClick={() => hanldeChangeThemeStyle(s)}>
                                {s.style === themeStyle && <CheckOutlined className={`rf jfe afe ${styles['theme-item-style-on']}`} />}
                            </span>
                        </Tooltip>)}
                    </div>
                </div>
                <Divider />
                <div className={styles['theme-item']}>
                    <p className={styles['theme-item-title']}>主题色</p>
                    <div className={`rf ac ${styles['theme-item-list']}`}>
                        {colorList.map(c => <Tooltip placement="top" title={c.name} key={c.color}>
                            <span className={styles['theme-item-color']} style={{ backgroundColor: c.color }} onClick={() => hanldeChangeThemeColor(c)}>
                                {c.color === themeColor && <CheckOutlined className={`rf ac jc ${styles['theme-item-color-on']}`} />}
                            </span>
                        </Tooltip>)}
                    </div>
                </div>
                <Divider />
                <div className={styles['theme-item']}>
                    <p className={styles['theme-item-title']}>导航模式</p>
                    <div className={`rf ac ${styles['theme-item-list']}`}>
                        {navTypeList.map(n => <Tooltip placement="top" title={n.name} key={n.navType}>
                            <span className={`${styles['theme-item-nav']} ${styles['theme-item-nav-' + n.navType]}`} onClick={() => hanldeChangeThemeNavStyle(n)}>
                                {n.navType === themeNavTypeStyle && <CheckOutlined className={`rf jfe afe ${styles['theme-item-nav-on']}`} />}
                            </span>
                        </Tooltip>)}
                    </div>
                </div>
            </>)
        }
    </div>
}

export default ThemeConfig;