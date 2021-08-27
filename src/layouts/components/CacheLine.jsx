import React from "react";

import styles from "./comp.module.scss";

import { CloseOutlined } from "@ant-design/icons";

const CacheLine = props => {
    return <ul className={`rf ac ${styles.cache}`}>
        <li className={styles.on}>
            <span className={styles.font}>重点人员</span>
            <CloseOutlined />
        </li>
        <li>
            <span className={styles.font}>重点人员</span>
            <CloseOutlined />
        </li>
        <li>
            <span className={styles.font}>重点人员</span>
            <CloseOutlined />
        </li>
        <li>
            <span className={styles.font}>重点人员</span>
            <CloseOutlined />
        </li>
        <li>
            <span className={styles.font}>专家管理</span>
            <CloseOutlined />
        </li>
    </ul>
}

export default CacheLine;