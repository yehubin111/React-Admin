import React, { t } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { dropByCacheKey } from "react-router-cache-route";

import styles from "./comp.module.scss";
import { delViewCache } from "redux/actions";

import { CloseOutlined } from "@ant-design/icons";

const CacheLine = props => {
    const { viewCache, delViewCache } = props;
    const location = useLocation();
    const history = useHistory();

    return <ul className={`rf ac ${styles.cache}`}>
        {
            viewCache.map(cache => {
                let tabOn = cache.path === location.pathname;

                return <li className={tabOn ? styles.on : ''} key={cache.key} onClick={() => {
                    history.push(cache.path);
                }}>
                    <span className={styles.font}>{t(cache.i18n)}</span>
                    {
                        viewCache.length > 1 && <CloseOutlined onClick={(e) => {
                            e.stopPropagation();
                            // 删除缓存列表
                            delViewCache(cache.key);
                            dropByCacheKey(cache.key);
                            // 如果删除的是当前高亮tab，则自动跳转到第一个tab
                            if (tabOn) {
                                let tabs = viewCache.filter(tab => tab.key !== cache.key);
                                history.push(tabs[0].path);
                            }
                        }} />
                    }
                </li>
            })
        }
    </ul>
}

const mapStateToProps = (state) => {
    return {
        viewCache: state.viewCache
    }
}

export default connect(mapStateToProps, { delViewCache })(CacheLine);