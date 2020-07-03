import React, { Component } from "react";
import { connect } from "react-redux";
import { Flex } from "antd-mobile";
import Bar from "@/components/bar";

import "./index.scss";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }
  componentWillMount() {
    this.props.setSelectedNav(0);
    this.getCode();
  }
  async getAjax() {
    if (!sessionStorage.login) {
      localStorage.clear();
      await $axios
        .get("/api/services/Main/WeiXinService/Login?code=" + this.state.code)
        .then((res) => {
          sessionStorage.login = true;
          let name;
          try {
            name = res.data.result.currentRole.name;
          } catch (error) {
            name = res.data.result.roles[0].name;
          }
          this.props.setRote(name);
          this.props.setUser(res.data.result);
        })
        .catch(() => {
          this.props.history.replace("/login");
        });
    }

    $axios.get("/api/services/Main/WeiXinService/GetCurUserTenants").then((res) => {
      this.props.setSchool(res.data.result);
    });
    $axios.get("/api/services/Main/Basic/GetEnumDescriptionList").then((res) => {
      let obj = {};
      res.data.result.forEach((v) => {
        obj[v.enumName] = v.values;
      });
      this.props.setEnum(obj);
    });
  }
  getCode() {
    // this.setState(
    //   {
    //     code: "021EjklS1xYPb211hamS1M3ilS1Ejkle"
    //   },
    //   () => {
    //     this.getAjax();
    //   }
    // );

    let code = new URL(location.href).searchParams.get("code");
    if (code) {
      this.setState(
        {
          code: code
        },
        () => {
          this.getAjax();
        }
      );
    } else {
      //微信认证
      let direct_url = "http://jxtwx.tongzhichina.com/home";
      let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa04936376f3b0e51&redirect_uri=${direct_url}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
      window.location.href = authUrl;
    }
  }
  route(path) {
    this.props.history.push(path);
  }
  render() {
    // 菜单表
    const menuList = [
      {
        name: "到校通知",
        url: require("@/icons/notice.svg"),
        bgColor: "#e84f7b",
        route: "notice",
        roles: ["parent"]
      },
      {
        name: "进出记录",
        url: require("@/icons/record.svg"),
        bgColor: "#5bb5da",
        route: "/inOut",
        roles: ["headmaster", "parent"]
      },

      {
        name: "出勤情况",
        url: require("@/icons/attendance.svg"),
        bgColor: "#36b87f",
        route: "attendance",
        roles: ["headmaster", "parent"]
      },
      {
        name: "上课课表",
        url: require("@/icons/curriculum.svg"),
        bgColor: "#b0a3e2",
        route: "curriculum",
        roles: ["headmaster", "parent", "teacher"]
      },
      {
        name: "成绩查询",
        url: require("@/icons/grade.svg"),
        bgColor: "#8ee9e0",
        route: "grade",
        roles: ["headmaster", "parent", "teacher"]
      },
      {
        name: "请假情况",
        url: require("@/icons/vacation.svg"),
        bgColor: "#aa5aed",
        route: "vacation",
        roles: ["headmaster", "parent"]
      },
      {
        name: "家长委托",
        url: require("@/icons/entrust.svg"),
        bgColor: "#4bb8f1",
        route: "entrust",
        roles: ["parent", "headmaster"]
      },
      {
        name: "消费查询",
        url: require("@/icons/entrust.svg"),
        bgColor: "#4bb8f1",
        route: "consumer",
        roles: ["parent"]
      },

      {
        name: "异常提醒",
        url: require("@/icons/errorNotice.svg"),
        bgColor: "#db5b5a",
        route: "errorNotice",
        roles: ["parent", "headmaster"]
      }
      // {
      //   name: "班级成绩查询",
      //   url: require("@/icons/classGrade.svg"),
      //   bgColor: "#fcb656",
      //   route: "classGrade",
      //   roles: ["teacher"]
      // },
      // {
      //   name: "学生成绩查询",
      //   url: require("@/icons/historyGrade.svg"),
      //   bgColor: "#a0d9a6",
      //   route: "historyGrade",
      //   roles: ["teacher"]
      // }
    ];
    let menu = () => {
      return (
        <Flex wrap="wrap" className="menuListBox">
          {menuList
            .filter((v) => v.roles.includes(this.props.rote))
            .map((v) => {
              return (
                <div className="menuItem" onClick={() => this.route(v.route)}>
                  <div className="menuBox" style={{ backgroundColor: v.bgColor }}>
                    <img src={v.url} alt={v.name} />
                  </div>
                  <div className="name">{v.name}</div>
                </div>
              );
            })}
        </Flex>
      );
    };
    return (
      <div className="Index">
        {menu()}
        <Bar {...this.props} />
      </div>
    );
  }
}
export default connect(
  (state, ownProps) => {
    return state;
  },
  (dispatch) => {
    return {
      setUser: (data) => dispatch({ type: "user", data }),
      setSelectedNav: (data) => dispatch({ type: "selectedNav", data }),
      setRote: (data) => dispatch({ type: "rote", data }),
      setSchool: (data) => dispatch({ type: "school", data }),
      setEnum: (data) => dispatch({ type: "enum", data })
    };
  }
)(Index);
