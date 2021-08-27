import React, { useState, useRef, useEffect, t } from 'react';

import styles from './index.module.scss';

import { Radio, Space } from 'antd';

const FormHeader = (props) => {
    const { ctrl, tabs, title = t('common.listTable'), onTab } = props;
    const defaultTab = tabs && Array.isArray(tabs) ? tabs.find(tab => tab.default) : null;
    const defaultValue = defaultTab ? defaultTab.value : "";
    const [scrollLeft, changeScrollLeft] = useState(false);
    const [scrollRight, changeScrollRight] = useState(false);
    const headerRef = useRef();

    const handleScroll = (target) => {
        let scrollLeft = target.scrollLeft;
        let scrollWidth = target.scrollWidth;
        let clientWidth = target.clientWidth;

        if (scrollLeft > 0)
            changeScrollLeft(true);
        else
            changeScrollLeft(false);

        if (scrollLeft + clientWidth === scrollWidth)
            changeScrollRight(false);
        else
            changeScrollRight(true);
    }
    useEffect(() => {
        handleScroll(headerRef.current);
    }, [])
    return (
        <div className={`rf jsb ac ${styles.header} ${scrollLeft && styles['header-scroll-left']} ${scrollRight && styles['header-scroll-right']}`}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.ctrl} ref={headerRef} onScroll={(e) => {
                handleScroll(e.target)
            }}>
                <Space
                    className={styles.space}
                    size="middle">
                    {(tabs && Array.isArray(tabs)) && <Radio.Group className={styles.radio} defaultValue={defaultValue} options={tabs} optionType="button" onChange={e => {
                        onTab(e.target.value, 'tab');
                    }} />}
                    {ctrl}
                </Space>
            </div>
        </div>
    )
}

export default FormHeader;