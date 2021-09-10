import React, { Component, i18nLocale } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { wrapContext } from "utils/context";
import defaultConfig from "defaultConfig";
import { moduleRouter } from "./config";
import { debounceFc } from "utils/common";

import { ConfigProvider } from 'antd';

const { productName, limit, structure } = defaultConfig;

let resizeFunc;
class RouteConfig extends Component {
  state = {
    isMobile: false, // 是否手机端
    mobileNormalWidth: 576, // 手机端临界宽度
  }
  constructor() {
    super();
    // 根据屏幕宽度判断设备
    resizeFunc = debounceFc(this.screenResize.bind(this), 300);
    const screenWidth = document.body.clientWidth;
    this.state.isMobile = screenWidth < this.state.mobileNormalWidth;
  }
  // 路由权限判断
  getLimitMenus() {
    let menus = [];
    let { userInfo: baseStorage } = this.props;
    /**
     * 20200828删除token判断条件
     * token丢失情况下，依然会生成路由
     * 重新登录逻辑在进入路由中执行
     */
    let limits = baseStorage.menuList ? baseStorage.menuList : [];
    let user = baseStorage.account;

    // 尝试过循环，不太好实现子路由为空不添加父路由的逻辑，所以选择递归
    function toCycleLimit(lms, rts, ms, noLimit) {
      rts.forEach(rt => {
        /**
         * 20210701修改路由判断逻辑
         * noLimit为true情况下，直接添加
         *    父级如果noLimit为true 子级如果noLimit不为false 则沿用父级的noLimit
         * authorLimit优先级高于normalLimit
         *    authority的判断逻辑类似noLimit，子级如果存在authority切不包含当前账号，则不显示，否则沿用父级
         *    normalLimit是原先的菜单路由判断方式
         *    authorLimit和normalLimit都为false，则当前路由不受任何限制
         */
        if (rt.noLimit && rt.noLimit === false) {
        } else if (noLimit || rt.noLimit === true) {
          rt.noLimit = true;
          if (rt.children) {
            let child = rt.children;
            rt.children = [];
            toCycleLimit(null, child, rt.children, rt.noLimit);
          }
          ms.push(rt);
          return;
        }
        if (limit.authorLimit) {
          /**
           * 只有存在authority且不包含当前账号的路由，才不生成，其他情况都生成，包括：
           * 不存在authority
           * 存在且包含当前账号
           */
          if (rt.authority && !rt.authority.includes(user)) {
          } else {
            if (rt.children) {
              let child = rt.children;
              rt.children = [];
              toCycleLimit(null, child, rt.children);
            }
            ms.push(rt);
          }
        } else {
          if (limit.normalLimit) {
            let limit = lms.find(lm => lm.title === (rt.meta && rt.meta.name));
            if (limit) {
              if (rt.children) {
                // 由于引用，会影响原数组
                let child = rt.children;
                rt.children = [];
                toCycleLimit(limit.childList, child, rt.children);
              }
              if (rt.children && rt.children.length > 0) {
                rt.redirect = rt.children[0].path;
                // // 如果子菜单只有单一一个路由，则只显示一级，外层icon继承
                // if (rt.children.length > 1)
                //   rt.redirect = rt.children[0].path;
                // else {
                //   let icon = rt.meta && rt.meta.icon;
                //   rt = rt.children[0];
                //   rt.meta.icon = icon;
                // }
              }
              if ((rt.children && rt.children.length > 0) || !rt.children)
                ms.push(rt);
            }
          } else {
            ms.push(rt);
          }
        }
      })
    }
    // 先处理最外层layout路由
    moduleRouter.forEach(layoutRouter => {
      if (layoutRouter.children) {
        let child = layoutRouter.children;
        let router = {
          ...layoutRouter
        }

        router.children = [];
        toCycleLimit(limits, child, router.children);
        router.redirect = router.children[0]
          ? (router.children[0].redirect || router.children[0].path)
          : "";

        menus.push(router)
      }
    })

    // 为了兼容缓存无菜单的情况，需要返回结果
    return menus;
  }
  setRedirectLink(menus) {
    /**
     * basic重定向逻辑
     * 如果获取到权限路由，并且可以拿到受权限约束的路由，则basic重定向路径为该页面
     * 否则重定向路径为登录页
     */
    let mode = menus.find(router => router.key === 'BasicLayout');
    let base = menus.find(router => router.key === 'BlankLayout');
    let redirect = !mode.redirect ? base.redirect : mode.redirect;

    return redirect;
  }
  componentDidMount() {
    // 监听屏幕尺寸变化
    window.addEventListener("resize", resizeFunc)
    // 初始化设置i18next改变语言
    const { lang } = this.props;
    i18nLocale(lang)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", resizeFunc);
  }
  screenResize(e) {
    const screenWidth = e.target.innerWidth;
    const isMobile = screenWidth < this.state.mobileNormalWidth;
    if (this.state.isMobile !== isMobile) {
      this.setState({
        isMobile
      })
    }
  }
  render() {
    const { isMobile } = this.state;
    const { langList, lang } = this.props;
    const menus = this.getLimitMenus();
    // 设置basic重定向地址
    const redirect = this.setRedirectLink(menus);

    const routerConfig = [...menus]; // [...menus, ...baseRouter]
    // 默认取本地语言
    const locale = langList.find(l => l.value === lang);
    return (
      <ConfigProvider locale={locale?.antd}>
        <wrapContext.Provider value={{
          navType: structure.navType,  // side top,
          theme: structure.theme, // dark light
          device: isMobile ? "h5" : "web",
          locale: locale?.value ?? "zh"
        }}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE}>
            <Switch>
              <Redirect exact key="/" from="/" to={redirect}></Redirect>
              {routerConfig.map(router => {
                // if (router.path === "/") {
                //   return <Redirect exact key={router.key} from={router.path} to={router.redirect}></Redirect>
                // } else {
                let Component = require(`../${router.children ? "layouts" : "pages"
                  }${router.component}`).default;
                return (
                  <Route
                    path={router.path}
                    key={router.component}
                    render={() => {
                      // // 拿到权限路由之后，渲染子路由
                      return React.createElement(Component, {
                        routes: router.children,
                        // redirectFrom: router.path,
                        // redirectTo: router.redirect,
                        // redirectKey: router.key
                      })
                    }}
                  />
                );
                // }
              })}
            </Switch>
          </BrowserRouter>
        </wrapContext.Provider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    token: localStorage.getItem(`${productName}-token`),
    langList: state.langList,
    lang: state.lang
  }
}

export default connect(mapStateToProps, {})(RouteConfig)