import React, { Component } from "react";
import routerConfig from "@/router/routerConfig";
import Body404 from "@/view/404";
function recursiveRouterConfigV4(config = []) {
  const routeMap = [];
  config.forEach((item) => {
    //判断是否有有子路由, 有子路由进行递归
    if (Array.isArray(item.children)) {
      recursiveRouterConfigV4(item.children);
    }
    routeMap.push(item.path);
  });
  return routeMap;
}
export default class GuardRouter extends Component {
  constructor(props) {
    super(props);
    this.routes = recursiveRouterConfigV4(routerConfig);
  }
  render() {
    let bool = this.routes.includes(window.location.pathname);
    return bool ? <div className="Router">{this.props.route}</div> : <Body404></Body404>;
  }
}
