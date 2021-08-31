import React, { t } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./comp.module.scss";

import { CloseOutlined } from "@ant-design/icons";

const CacheLine = props => {
    const { viewCache } = props;
    const location = useLocation();
    const history = useHistory();

    return <ul className={`rf ac ${styles.cache}`}>
        {
            viewCache.map(cache => (
                <li className={cache.path === location.pathname ? styles.on : ''} key={cache.key} onClick={() => {
                    history.push(cache.path);
                }}>
                    <span className={styles.font}>{t(cache.i18n)}</span>
                    <CloseOutlined />
                </li>
            ))
        }
    </ul>
}

const mapStateToProps = (state) => {
    return {
        viewCache: state.viewCache
    }
}

export default connect(mapStateToProps, {})(CacheLine);