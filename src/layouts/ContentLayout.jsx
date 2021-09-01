import React, { Suspense, t } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import defaultConfig from "defaultConfig";

import { message } from "antd";
import PageLoading from "components/PageLoading";

const { productName, useCache } = defaultConfig;

const RouteSwitch = ({ children }) => {
  return useCache
    ? <CacheSwitch>{children}</CacheSwitch>
    : <Switch>{children}</Switch>
}

const ContentLayout = props => {
  const { routes, redirectFrom, redirectTo, redirectKey } = props;

  const routerCreate = (routes, redirectFrom, redirectTo, redirectKey) => {
    console.log('route circle');
    let routers = routes.map(router => {
      if (router.children && router.children.length > 0) {
        return routerCreate(
          router.children,
          router.path,
          router.redirect,
          router.key
        );
      } else {
        // 组件懒加载
        let Component = React.lazy(() => import(`../pages${router.component}`));
        let props = {
          path: router.path,
          key: router.key,
          onEnter: (e) => {
            console.log(e)
          },
          render: () => {
            // 保存当前路由到缓存
            // if (useCache && router.useCache) saveViewCache(router);

            document.title = t(router.meta.i18n);
            let token = localStorage.getItem(`${productName}-token`);
            // 页面加载的时候，判断token是否存在
            if (!token && !router.noLimit) {
              setTimeout(() => {
                message.destroy("tokenFailure");
                message.warning({ content: "token失效，请重新登录", key: "tokenFailure" });
              }, 0)
              let redirect = router.path;
              return <Redirect to={`/base/login?redirect=${encodeURIComponent(redirect)}`}></Redirect>
            };
            return <Suspense fallback={<PageLoading />}>
              <Component name={t(router.meta.i18n)} />
            </Suspense>
          }
        }
        return (
          router.useCache
            ? <CacheRoute {...props} cacheKey={props.key} />
            : <Route {...props} />
        );
      }
    });

    if (redirectTo)
      routers.push(
        <Redirect
          exact
          from={redirectFrom}
          to={redirectTo}
          key={redirectKey}
        ></Redirect>
      );
    return routers;
  };

  return <RouteSwitch>
    {routerCreate(routes, redirectFrom, redirectTo, redirectKey)}
    <Redirect
      exact
      from="*"
      to="/base/404"
      key="404"
    ></Redirect>
  </RouteSwitch>
};

export default connect(() => ({}), {})(ContentLayout);
