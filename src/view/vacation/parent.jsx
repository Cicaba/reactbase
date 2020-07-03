import React, { Component } from "react";
import { connect } from "react-redux";
import Date from "@/components/date";
import QuerySelector from "@/components/querySelector";
import { ListView, List, Toast, Button } from "antd-mobile";

class Parent extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource,
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
    this.query();
  }

  query(bool = true) {
    // if (this.state.total && this.state.total < this.state.pageSize) {
    //   Toast.offline("没有更多的数据了");
    // }
    if (bool) {
      this.setState({ pageSize: this.state.pageSize + 50 });
    }
    let data = {
      filter: {
        // status: this.state.status[0],
        startTime: this.state.startTime,
        endTime: this.state.endTime
      },
      page: 1,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting
    };
    $axios.post("/api/services/Main/WeiXinService/PagedApplyParentId", data).then((res) => {
      this.setState({ dataList: res.data.result.items, total: res.data.result.totalCount });
    });
  }
  renderRow(rowData, rowID) {
    return (
      <List.Item extra={<spna style={{ color: "#000" }}>{this.state.applyStatusList.find((v) => v.value == rowData.status).label}</spna>}>
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
        {/* <QuerySelector label="请假状态:" onDismiss={() => this.setState({ status: "" })} onChange={(v) => this.setState({ status: v })} value={this.state.status} data={this.state.applyStatusList}></QuerySelector> */}
        <Date startTime={this.state.startTime} endTime={this.state.endTime} onConfirm={(startTime, endTime) => this.setState({ startTime, endTime })} />
        <Button onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
          查 询
        </Button>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
          renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
          style={{
            height: this.props.clientHeight - 170,
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
})(Parent);
