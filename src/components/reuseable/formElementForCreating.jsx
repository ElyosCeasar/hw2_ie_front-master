import React, { Component } from "react";
import { InputNumber, Input, Button, Select, Checkbox } from "antd";
import OptionManager from "./optionManager";
import { Link } from "react-router-dom";
const { Option } = Select;
class FormElementForCreating extends Component {
  state = {
    hasOption: 0
  };

  render() {
    //console.log(this.props.obj.field.type);
    return (
      <div
        style={{
          backgroundColor: "white",
          margin: "20px",
          padding: 10
        }}
      >
        <Button
          onClick={() => this.props.handleDelete(this.props.obj.id)}
          type="danger"
        >
          {this.props.direc === "rtl" ? "حذف" : "Delete"}
        </Button>
        <div style={{ margin: 15 }}>
          <h5>{this.props.direc === "rtl" ? "نوع آیتم" : "item type"}</h5>
          <Select
            style={{ width: "150px" }}
            placeholder="نوع آیتم"
            defaultValue={this.props.obj.field.type}
            onChange={this.handleChangeType}
          >
            <Option value="Text">
              {this.props.direc === "rtl" ? "ورودی نوشتن" : "Text"}
            </Option>
            <Option value="Number">
              {this.props.direc === "rtl" ? "ورودی عدد" : "Number"}
            </Option>
            <Option value="Date">
              {this.props.direc === "rtl" ? "ورودی تاریخ" : "Date"}
            </Option>
            <Option value="Location">
              {this.props.direc === "rtl" ? "ورودی مکان" : "Location"}
            </Option>
          </Select>
        </div>
        <div style={{ width: "80%", margin: 15 }}>
          <h5>
            {this.props.direc === "rtl"
              ? "نام آیتم جهت ذخیره در برنامه"
              : "item name for saving in app"}
          </h5>
          <Input
            value={this.props.obj.field.name}
            onChange={this.handleChangeName}
          />
        </div>
        <div style={{ width: "80%", margin: 15 }}>
          <h5>
            {this.props.direc === "rtl"
              ? "نام نمایشی آیتم"
              : "item name for showing"}
          </h5>
          <Input
            value={this.props.obj.field.title}
            onChange={this.handleChangeTitle}
          />
        </div>
        <div style={{ margin: 15 }}>
          <h5>{this.props.direc === "rtl" ? "اجباری بودن" : "is mandetory"}</h5>
          <Select
            placeholder={
              this.props.direc === "rtl" ? "اجباری بودن" : "is mandetory"
            }
            style={{ width: "100px" }}
            defaultValue={this.props.obj.field.required}
            onChange={this.handleChangeRequired}
          >
            <Option value="true">
              {this.props.direc === "rtl" ? "بله" : "Yes"}
            </Option>
            <Option value="false">
              {this.props.direc === "rtl" ? "خیر" : "No"}
            </Option>
          </Select>
        </div>
        <div style={{ margin: 15 }}>
          <h5>
            {this.props.direc === "rtl" ? "داری آپشن هست؟" : "has option"}
            <Checkbox
              checked={this.props.obj.field.hasOptions}
              onChange={this.onChangeHasOption}
              style={{ marginLeft: 15, marginRight: 15 }}
            ></Checkbox>
            {/* <InputNumber
              value={this.state.hasOption}
              onChange={this.onChangeHasOption}
              min={0}
              max={10}
              defaultValue={0}
              style={{ marginLeft: 15, marginRight: 15, width: 100 }}
            /> */}
          </h5>
          {this.discribtionBuilder()}
          {this.linkToFindingLocationPage()}
          {this.generateOptions()}
        </div>
      </div>
    );
  }

  handleChangeType = e => {
    this.props.handleChangeType(e, this.props.obj.id);
  };
  handleChangeName = e => {
    this.props.handleChangeName(e, this.props.obj.id);
  };
  handleChangeTitle = e => {
    this.props.handleChangeTitle(e, this.props.obj.id);
  };
  handleChangeRequired = e => {
    this.props.handleChangeRequired(e, this.props.obj.id);
  };

  onChangeHasOption = value => {
    this.setState({ hasOption: value.target.checked });
    this.props.handleChangeHasOption(value.target.checked, this.props.obj.id);
  };
  onChangeOptions = value => {
    // console.log("gg", value);
    this.props.handleChangeOptions(value, this.props.obj.id);
  };
  generateOptions = () => {
    if (this.props.obj.field.hasOptions) {
      return (
        <OptionManager
          direc={this.props.direc}
          onChangeOptions={this.onChangeOptions}
          intitialVal={this.props.obj.field.options}
        ></OptionManager>
      );
    }
  };
  linkToFindingLocationPage = () => {
    if (
      this.props.obj.field.hasOptions &&
      this.props.obj.field.type === "Location"
    ) {
      return (
        <Link to="/LocationFinder" target="_blank">
          {this.props.direc === "rtl"
            ? "برای پیدا کردن مختصات کلیک کنید"
            : "for finding location click here"}
        </Link>
      );
    }
  };
  discribtionBuilder = () => {
    if (this.props.obj.field.hasOptions) {
      return (
        <p>
          {this.props.direc === "rtl"
            ? "پر کردن دقیق آیتم ها مسئولیت کاربر است و نرم افزار در قبال پر کردن اشتباه مسئولیتی ندارد"
            : "caution: you must fill elements carefully we do not have any risponsiblity if you don't!"}
        </p>
      );
    }
  };
}

export default FormElementForCreating;
