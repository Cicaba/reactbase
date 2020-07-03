import React, { Component } from "react";
import { connect } from "react-redux";
import { Picker, List, Button, Toast } from "antd-mobile";
class School extends Component {
  constructor(props) {
    super(props);
    this.rote = null;
    this.state = {
      tenantId: [],
      roleId: [],
      classId: [],
      studentId: []
    };
  }
  //获取数据
  getData(type) {
    let arr = [];
    if (type === "tenantId") {
      arr = this.props.school.map((v) => {
        return {
          value: v.tenancyId,
          label: v.name
        };
      });
    } else if (type === "roleId" && this.state.tenantId.length) {
      arr = this.props.school
        .find((el) => el.tenancyId == this.state.tenantId[0])
        .roles.map((value) => {
          return {
            value: value.id,
            label: value.displayName
          };
        });
    } else if (type === "studentId" && this.state.tenantId.length && this.state.roleId.length) {
      arr = this.props.school
        .find((el) => el.tenancyId == this.state.tenantId[0])
        .roles.find((v) => v.name == this.rote)
        .students.map((v) => {
          return {
            value: v.id,
            label: v.name
          };
        });
    } else if (type === "classId" && this.state.tenantId.length && this.state.roleId.length) {
      arr = this.props.school
        .find((el) => el.tenancyId == this.state.tenantId[0])
        .roles.find((v) => v.name == this.rote)
        .classes.map((v) => {
          return {
            value: v.id,
            label: v.name
          };
        });
    }

    return arr;
  }
  //选中
  Ok(Obj, type) {
    this.setState(Obj);
    if (type === "roleId") {
      this.rote = this.props.school.find((v) => v.tenancyId == this.state.tenantId[0]).roles.find((v) => v.id == Obj.roleId).name;
      this.setState({
        classId: [],
        studentId: []
      });
    }
  }
  //根据条件渲染
  picke() {
    let el = null;
    if (this.state.tenantId.length && this.state.roleId.length) {
      if (this.rote === "parent") {
        el = (
          <Picker data={this.getData("studentId")} onOk={(v) => this.Ok({ studentId: v }, "studentId")} cols={1} value={this.state.studentId}>
            <List.Item arrow="horizontal">选择学生</List.Item>
          </Picker>
        );
      } else if (this.rote === "headmaster") {
        el = (
          <Picker data={this.getData("classId")} onOk={(v) => this.Ok({ classId: v }, "classId")} cols={1} value={this.state.classId}>
            <List.Item arrow="horizontal">选择班级</List.Item>
          </Picker>
        );
      }
    }
    return el;
  }
  //提交
  submit() {
    let obj = {
      tenantId: this.state.tenantId[0],
      roleId: this.state.roleId[0],
      classId: this.state.classId[0],
      studentId: this.state.studentId[0]
    };
    if (this.rote == "teacher") {
      if ($validate(obj, ["tenantId", "roleId"], ["学校", "角色"])) return;
    } else if (this.rote == "parent") {
      if ($validate(obj, ["tenantId", "roleId", "studentId"], ["学校", "角色", "学生"])) return;
    } else if (this.rote == "headmaster") {
      if ($validate(obj, ["tenantId", "roleId", "classId"], ["学校", "角色", "班级"])) return;
    } else {
      Toast.offline("请选择学校和角色!");
      return;
    }
    $axios.get("/api/services/Main/WeiXinService/ChangeSchool?" + $qs.stringify(obj)).then(() => {
      Toast.success("操作成功!");
    });
  }
  render() {
    return (
      <div>
        <Picker data={this.getData("tenantId")} onOk={(v) => this.Ok({ tenantId: v }, "tenantId")} cols={1} value={this.state.tenantId}>
          <List.Item arrow="horizontal">选择学校</List.Item>
        </Picker>
        <Picker data={this.getData("roleId")} onOk={(v) => this.Ok({ roleId: v }, "roleId")} cols={1} value={this.state.roleId}>
          <List.Item arrow="horizontal">选择角色</List.Item>
        </Picker>
        {this.picke()}
        <Button onClick={() => this.submit()} style={{ marginTop: "1rem" }} type="primary">
          提 交
        </Button>
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(School);
