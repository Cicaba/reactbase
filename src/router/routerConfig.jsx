// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import asyncComponent from "../components/AsyncComponent";

const routerConfig = [
  {
    path: "/",
    component: asyncComponent(import(/* webpackChunkName: 'base' */ "../containers/app")),
    params: {
      buffer: true
    },
    children: [
      {
        path: "/index",
        component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/text")),
        params: {
          buffer: true
        }
      },
      {
        path: "/found",
        component: asyncComponent(import(/* webpackChunkName: 'base' */ "../view/found")),
        params: {
          buffer: true
        }
      }
    ]
  }
];

export default routerConfig;
