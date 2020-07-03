import React, { Component } from "react";
import { List, InputItem, Picker } from "antd-mobile";

class QuerySelector extends Component {
  constructor(props) {
    super(props);
    this.dataList = [];
    this.state = {
      dataList: []
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(props) {
    this.dataList = props.data;
    this.setState({
      dataList: this.dataList
    });
  }
  fliter(v) {
    let arr = this.dataList.filter((el) => el.label.includes(v));
    arr && this.setState({ dataList: arr });
  }
  getValue() {
    return this.props.value.length ? this.dataList.find((v) => v.value === this.props.value[0]).label : "";
  }
  render() {
    return (
      <Picker
        title={<InputItem onChange={(v) => this.fliter(v)} clear={this.props.clear} placeholder={this.props.placeholder} />}
        data={this.state.dataList}
        extra={<span></span>}
        onChange={(v) => {
          this.props.onChange(v);
        }}
        onDismiss={(v) => this.props.onDismiss(v)}
        onOk={(v) => this.props.onOk(v)}
        cols={this.props.cols}
        disabled={this.props.disabled}
        dismissText={this.props.dismissText}
        // value={this.props.value}
      >
        <InputItem value={this.getValue()} placeholder="请选择" editable={false}>
          {this.props.label}
        </InputItem>
        {/* <List.Item arrow="horizontal">{this.props.label}</List.Item> */}
      </Picker>
    );
  }
}
QuerySelector.defaultProps = {
  dismissText: "清空",
  label: "",
  clear: true,
  cols: 1,
  value: null,
  disabled: false,
  placeholder: "请输入内容检索",
  onChange: () => {},
  onDismiss: () => {},
  onOk: () => {}
};
export default QuerySelector;
