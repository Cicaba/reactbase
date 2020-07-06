// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
//layout
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import asyncComponent from "../components/AsyncComponent";

const routerConfig = [
  {
    path: "/",
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    params: {
      name: "首页",
      buffer: false
    },
    children: [
      {
        path: "/self/school",
        component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/self/school")),
        params: {
          name: "切换学校",
          buffer: false
        }
      },
      {
        path: "/self/rote",
        component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/self/rote")),
        params: {
          name: "切换角色",
          buffer: false
        }
      }
    ]
  },
  {
    path: "/home",
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/index")),
    params: {
      name: "首页",
      buffer: true
    }
  },
  {
    path: "/inOut",
    layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/inOut")),
    params: {
      name: "进出记录",
      buffer: false
    }
  },
  {
    path: "/attendance",
    layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/attendance")),
    params: {
      name: "出勤情况",
      buffer: false
    }
  },
  {
    path: "/curriculum",
    layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/curriculum")),
    params: {
      name: "上课课表",
      buffer: false
    }
  },
  {
    path: "/grade",
    layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/grade")),
    params: {
      name: "成绩查询",
      buffer: false
    }
  },
  {
    path: "/vacation",
    layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/vacation")),
    params: {
      name: "请假情况",
      buffer: false
    }
  },
  {
    path: "/entrust",
    // layout: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/nav")),
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/entrust")),
    params: {
      name: "家长委托",
      buffer: false
    }
  },
  {
    path: "/self",
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/self")),
    params: {
      name: "个人中心",
      buffer: true
    }
  },
  {
    path: "/login",
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/login")),
    params: {
      name: "登陆",
      buffer: false
    }
  }
];

export default routerConfig;
