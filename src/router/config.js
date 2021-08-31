import React from "react";

import Icon, {
  UserOutlined,
  UnorderedListOutlined,
  SketchOutlined,
  WarningOutlined,
  BarChartOutlined,
  FundOutlined,
  SettingOutlined,
  AlertOutlined
} from "@ant-design/icons";
import { ReactComponent as ExpertIcon } from "assets/images/expert.svg";

/**
 * key: String 页面组件标识，唯一
 * meta: Object 额外信息 {侧边导航栏名称，侧边导航栏icon，页面介绍，国际化名称}，必填 
 *    { name: String, icon: String, introduce: String, i18n: String }
 * hidden: Boolean 是否显示在左侧菜单栏
 * useCache: Boolean 是否开启页面状态缓存，需要defaultConfig里的useCache开启后才会生效
 * noLimit: Boolean 是否受权限管理约束 包括
 * redirect: String 会生成一个Redirect路由组件
 * children: Array 子组件
 */
const baseRouter = [
  {
    path: "/base",
    // component: "/BlankLayout",
    redirect: "/base/login",
    key: "base",
    noLimit: true,
    hidden: true,
    meta: {
      name: "基础",
      icon: ""
    },
    children: [
      {
        path: "/base/login",
        component: "/base/login",
        hidden: true,
        meta: {
          i18n: "menu.login",
          name: "登录",
          icon: ""
        },
        key: "Login"
      },
      {
        path: "*",
        component: "/base/404",
        hidden: true,
        meta: {
          i18n: "menu.notFound",
          name: "404",
          icon: ""
        },
        key: "404"
      }
    ]
  }
]
const navRouter = [
  {
    path: "/home",
    component: "/home/index",
    useCache: true,
    meta: {
      name: "首页",
      i18n: "menu.home",
      icon: <BarChartOutlined />,
      introduce: ""
    },
    key: "Home"
  },
  {
    path: "/record",
    component: "/record/index",
    useCache: true,
    meta: {
      name: "信访记录",
      i18n: "menu.record",
      icon: <UnorderedListOutlined />,
      introduce: ""
    },
    key: "Record"
  },
  {
    path: "/people",
    redirect: "/people/index",
    meta: {
      name: "信访人员",
      i18n: "menu.people",
      icon: <UserOutlined />,
      introduce: ""
    },
    key: "People",
    children: [
      {
        path: "/people/index",
        component: "/people/index",
        meta: {
          name: "人员列表",
          i18n: "menu.peopleList",
          introduce: ""
        },
        key: "PeopleList",
      },
      {
        path: "/people/detail/:id_card",
        component: "/people/detail",
        hidden: true,
        noLimit: true,
        meta: {
          name: "人员详情",
          i18n: "menu.peopleDetail",
          introduce: ""
        },
        key: "PeopleDetail",
      }
    ]
  },
  {
    path: "/important",
    component: "/important/index",
    meta: {
      name: "重点人员",
      i18n: "menu.important",
      icon: <SketchOutlined />,
      introduce: ""
    },
    key: "Important"
  },
  {
    path: "/expert",
    component: "/expert/index",
    meta: {
      name: "专家管理",
      i18n: "menu.expert",
      icon: <Icon component={ExpertIcon} />,
      introduce: ""
    },
    key: "Expert"
  },
  {
    path: "/event",
    redirect: "/event/index",
    meta: {
      name: "涉稳事件",
      i18n: "menu.event",
      icon: <AlertOutlined />,
      introduce: ""
    },
    key: "Event",
    children: [
      {
        path: "/event/index",
        component: "/event/index",
        meta: {
          name: "事件列表",
          i18n: "menu.eventList",
          introduce: ""
        },
        key: "EventList"
      },
      {
        path: "/event/detail/:id",
        component: "/event/detail",
        noLimit: true,
        hidden: true,
        meta: {
          name: "事件详情",
          i18n: "menu.eventDetail",
          introduce: ""
        },
        key: "EventDetail"
      }
    ]
  },
  {
    path: "/warn",
    component: "/warn/index",
    meta: {
      name: "预警推送",
      i18n: "menu.warn",
      icon: <WarningOutlined />,
      introduce: ""
    },
    key: "Warn"
  },
  {
    path: "/statistics",
    redirect: "/statistics/man",
    meta: {
      name: "统计分析",
      i18n: "menu.statistics",
      icon: <FundOutlined />,
      introduce: ""
    },
    key: "Statistics",
    children: [
      {
        path: "/statistics/man",
        component: "/statistics/man",
        meta: {
          name: "信访人员分析",
          i18n: "menu.statisticsMan",
          introduce: ""
        },
        key: "StatisticsMan",
      },
      {
        path: "/statistics/trend",
        component: "/statistics/trend",
        meta: {
          name: "信访趋势分析",
          i18n: "menu.statisticsTrend",
          introduce: ""
        },
        key: "StatisticsTrend",
      },
      {
        path: "/statistics/vip",
        component: "/statistics/vip",
        meta: {
          name: "重点人员分析",
          i18n: "menu.statisticsVip",
          introduce: ""
        },
        key: "StatisticsVip",
      },
      {
        path: "/statistics/task",
        component: "/statistics/task",
        meta: {
          name: "任务统计",
          i18n: "menu.statisticsTask",
          introduce: ""
        },
        key: "StatisticsTask",
      },
    ]
  },
  {
    path: "/limit",
    redirect: "/limit/users",
    meta: {
      name: "系统管理",
      i18n: "menu.limit",
      icon: <SettingOutlined />,
      introduce: ""
    },
    key: "Limit",
    children: [
      {
        path: "/limit/users",
        component: "/limit/users",
        meta: {
          name: "用户管理",
          i18n: "menu.limitUsers",
          introduce: ""
        },
        key: "LimitUsers",
      },
      {
        path: "/limit/roles",
        component: "/limit/roles",
        meta: {
          name: "角色管理",
          i18n: "menu.limitRoles",
          introduce: ""
        },
        key: "LimitRoles",
      },
      {
        path: "/limit/units",
        component: "/limit/units",
        meta: {
          name: "角色管理",
          i18n: "menu.limitUnits",
          introduce: ""
        },
        key: "LimitUnits",
      },
      {
        path: "/limit/reason",
        component: "/data/reason",
        meta: {
          name: "信访原因管理",
          i18n: "menu.dataReason",
          introduce: ""
        },
        key: "DataReason",
      }
    ]
  },
]
export const moduleRouter = [
  // {
  //   path: "/base",
  //   component: "/BlankLayout",
  //   redirect: "/base/login",
  //   key: "base",
  //   noLimit: true,
  //   hidden: true,
  //   meta: {
  //     name: "基础",
  //     icon: ""
  //   },
  //   children: [
  //     {
  //       path: "/base/login",
  //       component: "/base/login",
  //       hidden: true,
  //       meta: {
  //         name: "登录",
  //         icon: ""
  //       },
  //       key: "login"
  //     }
  //   ]
  // },
  // {
  //   path: "/home",
  //   component: "/BasicLayout",
  //   redirect: "/home/index",
  //   noLimit: true,
  //   meta: {
  //     name: "首页",
  //     icon: <HomeOutlined />
  //   },
  //   key: "home",
  //   children: [
  //     {
  //       path: "/home/index",
  //       component: "/home/index",
  //       meta: {
  //         name: "首页",
  //         icon: "",
  //         introduce: ""
  //       },
  //       key: "homeIndex"
  //     }
  //   ]
  // },
  {
    path: "/base",
    component: "/BlankLayout",
    redirect: "/base/login",
    key: "BlankLayout",
    children: [...baseRouter]
  },
  {
    path: "/",
    component: "/BasicLayout",
    redirect: "/product/manage",
    key: "BasicLayout",
    children: [...navRouter]
  },
  // {
  //   path: "/",
  //   component: "/BasicLayout",
  //   redirect: "/user/manage",
  //   noLimit: true,
  //   key: "basic"
  // },
];
// export const baseRouter = [
//   // 重定向
//   // {
//   //   path: "/",
//   //   component: "/BasicLayout",
//   //   redirect: "/user/manage",
//   //   noLimit: true,
//   //   key: "basic"
//   // },
//   {
//     path: "*",
//     component: "/base/404",
//     noLimit: true,
//     hidden: true,
//     meta: {
//       name: "404",
//       icon: ""
//     },
//     key: "404"
//   }
// ];

// export const routerConfig = [...moduleRouter, ...baseRouter];