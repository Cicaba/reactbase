import React, { Component } from "react";
import { connect } from "react-redux";
import QuerySelector from "@/components/querySelector";
import Date from "@/components/date";
import { ListView, List, Toast, InputItem, Button } from "antd-mobile";

class Headmaster extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource,
      no: "",
      name: "",
      startTime: $date(new window.Date().getTime(), "yyyy-MM-dd"),
      endTime: $date(new window.Date().getTime(), "yyyy-MM-dd"),
      status: "",
      page: 1,
      pageSize: 50,
      sorting: "",
      total: 0,
      visible: false,
      students: [],
      dataList: [],
      applyStatusList: this.props.enum.ApplyStatus.map((v) => {
        return {
          label: v.description,
          value: v.enumValue
        };
      })
    };
  }
  componentWillMount() {
    $axios.post("/api/services/Main/WeiXinService/PageCurrentUserMgrStudents", { page: 1, pageSize: 1000, sorting: "" }).then((res) => {
      let students = res.data.result.items.map((v) => {
        return {
          value: v.name,
          label: v.name
        };
      });
      this.setState({ students: students });
    });
    this.query();
  }

  query(bool = true) {
    // if (this.state.total && this.state.total < this.state.pageSize) {
    //   Toast.offline("没有更多的数据了");
    //   return;
    // }
    if (bool) {
      this.setState({ pageSize: this.state.pageSize + 50 });
    }
    let data = {
      filter: {
        // status: this.state.status[0],
        no: this.state.no,
        name: this.state.name[0],
        startTime: this.state.startTime,
        endTime: this.state.endTime
      },
      page: 1,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting
    };
    $axios.post("/api/services/Main/WeiXinService/PagedApplyByMgr", data).then((res) => {
      this.setState({ dataList: res.data.result.items, total: res.data.result.totalCount });
    });
  }
  renderRow(rowData, rowID) {
    return (
      <List.Item extra={<spna style={{ color: "#000" }}>{this.state.applyStatusList.find((v) => v.value == rowData.status).label}</spna>}>
        {rowData.applyStudent.name + " "}
        {rowData.applyType.applyTypeName + " "}
        <List.Item.Brief>
          创建时间: {$date(rowData.creationTime, "yyyy-MM-dd hh:mm:ss")}
          <br />
          开始时间: {$date(rowData.startTime, "yyyy-MM-dd")}
          <br />
          结束时间: {$date(rowData.endTime, "yyyy-MM-dd")}
          <br />
          备注: {rowData.remark}
        </List.Item.Brief>
      </List.Item>
    );
  }
  render() {
    return (
      <div>
        <List>
          <InputItem value={this.state.no} onChange={(v) => this.setState({ no: v })} clear placeholder="请输入">
            学号:
          </InputItem>
        </List>
        <QuerySelector label="选择学生:" onDismiss={() => this.setState({ name: "" })} onChange={(v) => this.setState({ name: v })} value={this.state.name} data={this.state.students}></QuerySelector>
        {/* <QuerySelector label="请假状态:" onDismiss={() => this.setState({ status: "" })} onChange={(v) => this.setState({ status: v })} value={this.state.status} data={this.state.applyStatusList}></QuerySelector> */}
        <Date startTime={this.state.startTime} endTime={this.state.endTime} onConfirm={(startTime, endTime) => this.setState({ startTime, endTime })} />
        <Button onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
          查 询
        </Button>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
          renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
          style={{
            height: this.props.clientHeight - 260,
            overflow: "auto"
          }}
          pageSize={10}
          onEndReached={() => this.query(true)}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Headmaster);
