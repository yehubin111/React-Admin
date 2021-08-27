import React, { t } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { typeOf } from "utils/common";
import defaultConfig from "defaultConfig";

import styles from "./comp.module.scss";
import { Breadcrumb } from "antd";
import CacheLine from "./CacheLine";

const { useCache, showPageInfo } = defaultConfig;

const ThemeTitle = props => {
  const { pathname: path } = useLocation();
  // 匹配
  const reg = new RegExp("\\/:.+\\??"); // /\/:.+\??/;

  let { routes, isMobile } = props;
  let patharr = path.split("/").filter(v => v);
  return (
    <div className={styles.themetitle}>
      <div className={`rf jsb ${styles['bread-line']}`}>
        {
          useCache
            ? <CacheLine />
            : <div className={`rf ac ${styles.bread}`}>
              <Breadcrumb>
                {patharr.map((_, index) => {
                  if (typeOf(routes) !== "Array") return false;
                  let route = routes.find(
                    rt => rt.path.replace(reg, "") === `/${patharr.slice(0, index + 1).join("/")}`
                  );
                  if (!route) return null;
                  else if (route.children && route.children.length > 0) {
                    routes = route.children;
                    return (
                      <Breadcrumb.Item key={route.key}>
                        <Link to={route.path}>{t(route.meta.i18n)}</Link>
                      </Breadcrumb.Item>
                    );
                  } else {
                    routes = route;
                    return (
                      <Breadcrumb.Item key={route.key}>{t(route.meta.i18n)}
                      </Breadcrumb.Item>
                    );
                  }
                })}
              </Breadcrumb>
            </div>
        }
      </div>
      {
        showPageInfo && <div className={styles.info}>
          <h1 className={styles.title}>{routes.meta ? t(routes.meta.i18n) : ""}</h1>
          {routes.meta && routes.meta.introduce && (
            <p className={styles.introduce}>{routes.meta.introduce}</p>
          )}
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ThemeTitle);
