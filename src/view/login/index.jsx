import React, { Component } from "react";
import { connect } from "react-redux";

import { List, InputItem, Button, Toast } from "antd-mobile";
import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: 0,
      phoneNumber: "",
      captchaId: "",
      code: "",
      weixinAccCode: ""
    };
  }
  componentWillMount() {
    this.getCode();
  }
  getCode() {
    // this.setState({
    //   weixinAccCode: "021d5oeh0ynjUu1H9Lbh05I3eh0d5oeR"
    // });
    let code = new URL(location.href).searchParams.get("code");
    if (code) {
      this.setState({
        weixinAccCode: code
      });
    } else {
      //微信认证
      let direct_url = "http://jxtwx.tongzhichina.com/login";
      let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa04936376f3b0e51&redirect_uri=${direct_url}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
      window.location.href = authUrl;
    }
  }
  captcha() {
    if (this.state.captcha) {
      return <span>{this.state.captcha}s</span>;
    } else {
      return <span onClick={() => this.getCaptcha()}>验证码</span>;
    }
  }
  getCaptcha() {
    $axios.post("/api/services/Main/WeiXinService/SendCode?" + $qs.stringify({ phoneNumber: this.state.phoneNumber })).then((res) => {
      this.setState({
        captchaId: res.data.result
      });
      Toast.success("发送成功!");
      this.setState(
        {
          captcha: 30
        },
        () => {
          let interval = setInterval(() => {
            this.setState(
              {
                captcha: this.state.captcha - 1
              },
              () => {
                if (this.state.captcha == 0) {
                  this.setState(
                    {
                      captcha: 0
                    },
                    () => {
                      clearInterval(interval);
                    }
                  );
                }
              }
            );
          }, 1000);
        }
      );
    });
  }
  login() {
    let data = {
      phoneNumber: this.state.phoneNumber,
      captchaId: this.state.captchaId,
      code: this.state.code,
      weixinAccCode: this.state.weixinAccCode
    };
    $axios.get("/api/services/Main/WeiXinService/WeixinBinding?" + $qs.stringify(data)).then((res) => {
      Toast.success("登陆成功!");
      this.props.history.replace("/index");
    });
  }
  render() {
    return (
      <div className="Login">
        <div className="LoginContent">
          <div className="LoginImg">
            <img src={require("@/imgs/logo.png")} alt="" />
          </div>
          <div className="inputDiv">
            <List>
              <InputItem value={this.state.phoneNumber} onChange={(v) => this.setState({ phoneNumber: v })} maxLength={11} type="number" placeholder="请输手机号" clear>
                手机号:
              </InputItem>
            </List>
            <List>
              <InputItem value={this.state.code} onChange={(v) => this.setState({ code: v })} extra={this.captcha()} type="number" placeholder="请输验证码" clear>
                验证码:
              </InputItem>
            </List>
            <Button disabled={!this.state.phoneNumber || !this.state.code} className="btn" onClick={() => this.login()} style={{ margin: ".8rem 0" }}>
              登 陆
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(Login);
