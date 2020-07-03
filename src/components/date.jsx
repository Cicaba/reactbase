import React, { Component } from "react";
import { Calendar, InputItem } from "antd-mobile";
class QuerySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
      visible: false
    };
  }
  componentWillMount() {
    this.setState({
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      visible: this.props.visible
    });
  }
  componentWillReceiveProps(props) {
    this.setState({
      startTime: props.startTime,
      endTime: props.endTime,
      visible: props.visible
    });
  }
  date() {
    if (this.state.startTime && this.state.endTime) {
      return $date(this.state.startTime, "yyyy-MM-dd") + " 至 " + $date(this.state.endTime, "yyyy-MM-dd");
    } else {
      return "";
    }
  }
  render() {
    return (
      <div className="date">
        <InputItem
          value={this.date()}
          onClick={() => {
            this.setState({ visible: !this.state.visible });
          }}
          placeholder="请选择"
          editable={false}
        >
          {this.props.label}
        </InputItem>
        <Calendar
          infiniteOpt={true}
          rowSize="normal"
          minDate={new window.Date("2020-01-01")}
          defaultValue={[new Date(this.state.startTime), new Date(this.state.endTime)]}
          visible={this.state.visible}
          onConfirm={(startTime, endTime) => {
            this.setState({ visible: false, startTime, endTime }, () => {
              this.props.onConfirm(this.state.startTime, this.state.endTime);
            });
          }}
          onCancel={() =>
            this.setState({ visible: false, startTime: "", endTime: "" }, () => {
              this.props.onConfirm(this.state.startTime, this.state.endTime);
            })
          }
        />
      </div>
    );
  }
}
QuerySelector.defaultProps = {
  visible: false,
  label: "选择日期:",
  startTime: "",
  endTime: "",
  onConfirm: () => {}
};
export default QuerySelector;
