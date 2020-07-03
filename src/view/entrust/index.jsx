import React, { Component } from "react";
import { connect } from "react-redux";
import { TextareaItem, Button, Toast } from "antd-mobile";
import Nav from "@/view/nav";
import Date from "@/components/date";
import Parent from "./parent";
import Headmaster from "./headmaster";
//委托
class Entrust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      startTime: window.Date(),
      endTime: window.Date(),
      studentId: this.props.user.winXinBindingOut.student ? this.props.user.winXinBindingOut.student.id : "",
      remark: ""
    };
  }
  haed() {
    if (this.props.rote === "parent") {
      return <Parent />;
    } else {
      return <Headmaster />;
    }
  }
  add() {
    this.setState({ show: false });
  }
  save() {
    let data = {
      startTime: $date(this.state.startTime, "yyyy-MM-dd"),
      endTime: $date(this.state.endTime, "yyyy-MM-dd"),
      studentId: this.state.studentId,
      remark: this.state.remark
    };
    $axios.post("/api/services/Main/WeiXinService/AddEntrust", data).then(() => {
      this.setState({ show: true });
      Toast.success("操作成功!");
    });
  }
  render() {
    return (
      <div className="Entrust" ref="this" style={{ padding: "0.6rem" }}>
        <Nav {...this.props} rightContent={this.props.rote === "parent" ? <span onClick={() => this.add()}>新增</span> : ""} name="家长委托"></Nav>
        {this.state.show ? (
          this.haed()
        ) : (
          <div>
            <Date startTime={this.state.startTime} endTime={this.state.endTime} onConfirm={(startTime, endTime) => this.setState({ startTime, endTime })} />
            <TextareaItem value={this.state.remark} onChange={(v) => this.setState({ remark: v })} title="委托内容:" placeholder="请输入" data-seed="logId" count={500} rows={3} autoHeight />
            <Button disabled={Boolean(!this.state.remark) || Boolean(!this.state.startTime)} onClick={() => this.save(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
              新 增
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(Entrust);
