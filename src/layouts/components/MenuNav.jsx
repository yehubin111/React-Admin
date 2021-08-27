import React, { useState, useEffect, t } from "react";
import { Link, withRouter } from "react-router-dom";

import styles from './comp.module.scss';

import { Menu } from "antd";

const MenuNav = props => {
  const { location: { pathname: path }, routes, onRoute, mode = "inline", theme = "dark" } = props;
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    toSelectMenu(routes, path);
  }, [path])

  const toSelectMenu = (routes, path) => {
    let defaultOpenKeys = [],
      defaultSelectedKeys = [];
    let patharr = path.split("/").filter(v => v);
    // 深度遍历
    patharr.forEach((_, index) => {
      let route = routes.find(
        rt => {
          let path = "^" + rt.path.replace(/(\/:[^\/]*)/g, "[^/]*") + "$";
          let reg = new RegExp(path);
          return reg.test(`/${patharr.slice(0, index + 1).join("/")}`);
          // rt.path === `/${patharr.slice(0, index + 1).join("/")}`
        }
      );
      // 20210623修改，子路由只有1级，并且无下一级路由，则直接显示父级路由，不展开
      let usedChildrenLength = route?.children?.filter(child => !child.hidden).length ?? 0;
      if (!route) { }
      else if (usedChildrenLength > 1) {
        routes = route.children;
        defaultOpenKeys.push(route.key);
      } else if (usedChildrenLength === 1) {
        // 如果子路由只有一个未隐藏的路由，则先不处理，循环到下一级再处理
        routes = route.children;
      } else {
        defaultSelectedKeys.push(route.key);
      }
    });
    setSelectedKeys(defaultSelectedKeys);
    if (mode === 'inline')
      setOpenKeys(defaultOpenKeys);
    else
      setOpenKeys([]);

    return { defaultOpenKeys, defaultSelectedKeys };
  }
  const toCreateMenu = (routes) => {
    return routes.map(router => {
      // 隐藏菜单
      if (router.hidden) return null;
      // 20210623修改，子路由只有1级，并且无下一级路由，则直接显示父级路由
      let usedChildrenLength = router.children?.filter(child => !child.hidden).length ?? 0;
      if (usedChildrenLength > 1) {
        return (
          <Menu.SubMenu key={router.key} icon={router.meta.icon} title={t(router.meta.i18n)}>
            {toCreateMenu(router.children)}
          </Menu.SubMenu>
        );
      } else if (usedChildrenLength === 1) {
        let child = { ...router.children[0] };
        child.meta = { ...router.meta };
        // child.key = router.key;
        return toCreateMenu([child]);
      } else {
        return (
          <Menu.Item key={router.key} icon={router.meta.icon}>
            <Link to={router.path.split(":")[0]}>{t(router.meta.i18n)}</Link>
          </Menu.Item>
        );
      }
    });
  }
  const handleClick = (e) => {
    setSelectedKeys([e.key]);
  }
  const handleOpenChange = (e) => {
    setOpenKeys([e[e.length - 1]])
  }
  return mode === 'horizontal'
    ? <Menu
      className={styles['horizontal-menu']}
      theme={theme}
      mode={mode}
      selectedKeys={selectedKeys}
      onClick={(e) => {
        handleClick(e);
        onRoute && onRoute();
      }}
    >
      {toCreateMenu(routes)}
    </Menu> : <Menu
      theme={theme}
      mode={mode}
      onOpenChange={e => {
        handleOpenChange(e);
      }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={(e) => {
        handleClick(e);
        onRoute && onRoute();
      }}
    >
      {toCreateMenu(routes)}
    </Menu>
}

export default withRouter(MenuNav);



