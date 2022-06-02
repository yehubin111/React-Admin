import React, { useRef, useContext, useState, useEffect } from "react";

import { CloseOutlined, SettingOutlined } from "@ant-design/icons";

import styles from "./comp.module.scss";

const ThemeConfig = () => {
    const [status, changeStatus] = useState(false);

    return <div className={styles['theme-config']}>
        <div className={styles['theme-mark']}>
            {status ? <CloseOutlined className={styles['mark-icon']} /> : <SettingOutlined className={styles['mark-icon']} />}


        </div>
    </div>
}

export default ThemeConfig;