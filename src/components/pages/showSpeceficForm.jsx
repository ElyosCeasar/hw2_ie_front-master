import React, { Component } from "react";

import appService from "../../services/appService";
import {
  Button,
  Input,
  InputNumber,
  DatePicker,
  Select,
  notification
} from "antd";
import MapComponent from "../reuseable/mapComponent";
const { Option } = Select;
class ShowSpeceficForm extends Component {
  firstTimeForSetState = true;
  state = {
    form: {},
    ElementValues: []
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    const service = new appService();
    service
      .getSpeceficFormById(id)
      .then(res => this.setState({ form: res.data.form }));

    // .then(res => console.log(res.data.form));
  }
  componentDidUpdate() {
    if (this.state.form.fields && this.firstTimeForSetState) {
      this.intialStateBuilder();
      this.firstTimeForSetState = false;
    }
  }

  render() {
    console.log(this.state.ElementValues);
    return (
      <div
        style={{
          textAlign: this.props.direc === "rtl" ? "right" : "left"
        }}
      >
        <h3 style={{ color: "white", marginRight: "20px", marginLeft: "20px" }}>
          {this.props.direc === "rtl"
            ? "مشاهده و پر کردن فرم"
            : "Show And Fill"}
        </h3>
        <div
          style={{
            backgroundColor: "white",
            margin: "20px",
            padding: 10
          }}
        >
          <h4>{this.state.form.title}</h4>

          {this.formBuilder()}
          <Button
            type="primary"
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "10px"
            }}
            onClick={this.submitForm}
          >
            {this.props.direc === "rtl" ? "ثبت" : "confirm"}
          </Button>
        </div>
      </div>
    );
  }

  formBuilder = () => {
    let jsxElementArray = [];
    if (this.state.form.fields) {
      let fields = [...this.state.form.fields];
      let ElementValues = [...this.state.ElementValues];

      for (let i = 0; i < fields.length; i++) {
        const color = fields[i].required === "true" ? "#ffffb3" : "white";
        if (!fields[i].hasOptions) {
          switch (fields[i].type) {
            case "Text":
              jsxElementArray.push(
                <div style={{ marginTop: "20px", display: "block" }}>
                  <label htmlFor={fields[i].name}>
                    {fields[i].required === "true" ? "*" : ""}
                    {fields[i].title} :
                  </label>
                  <Input
                    id={fields[i].name}
                    style={{
                      width: "80%",
                      marginLeft: "10px",
                      marginRight: "10px",
                      backgroundColor: color
                    }}
                    value={ElementValues[i]}
                    itemId={i}
                    key={i}
                    onChange={this.inputOnChangeHandeler}
                  ></Input>
                </div>
              );
              break;
            case "Number":
              jsxElementArray.push(
                <div style={{ marginTop: "20px", display: "block" }}>
                  <label htmlFor={fields[i].name}>
                    {fields[i].required === "true" ? "*" : ""}
                    {fields[i].title} :
                  </label>
                  <InputNumber
                    id={fields[i].name}
                    style={{
                      width: "20%",
                      marginLeft: "10px",
                      marginRight: "10px",
                      backgroundColor: color
                    }}
                    Value={ElementValues[i]}
                    // defaultValue={0}
                    itemId={i}
                    key={i}
                    onChange={e => this.inputNumberOnChangeHandeler(e, i)}
                  ></InputNumber>
                </div>
              );
              break;
            case "Date":
              jsxElementArray.push(
                <div style={{ marginTop: "20px", display: "block" }}>
                  <label htmlFor={fields[i].name}>
                    {fields[i].required === "true" ? "*" : ""}
                    {fields[i].title} :
                  </label>
                  <DatePicker
                    id={fields[i].name}
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      backgroundColor: color,
                      direction: "ltr"
                    }}
                    Value={ElementValues[i]}
                    defaultValue={0}
                    itemId={i}
                    key={i}
                    onChange={e => this.DatePickerOnChangeHandeler(e, i)}
                  ></DatePicker>
                </div>
              );
              break;
            case "Location":
              jsxElementArray.push(
                <div
                  style={{
                    marginTop: "20px",
                    display: "block",
                    height: "300px",
                    marginBottom: "40px"
                  }}
                >
                  <label htmlFor={fields[i].name}>
                    {fields[i].required === "true" ? "*" : ""}
                    {fields[i].title} :
                  </label>
                  <MapComponent
                    id={fields[i].name}
                    defaultValue={0}
                    itemId={i}
                    key={i}
                    points={ElementValues[i]}
                    clickHandler={this.LocationOnClickHandeler}
                  ></MapComponent>
                </div>
              );
              break;
            default:
              console.log("form element not found");
          }
        } else {
          jsxElementArray.push(
            <div style={{ marginTop: "20px", display: "block" }}>
              <label htmlFor={fields[i].name}>
                {fields[i].required === "true" ? "*" : ""}
                {fields[i].title} :
              </label>

              <Select
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  backgroundColor: color,
                  width: "300px",
                  textAlign: "center"
                }}
                placeholder={
                  this.props.direc === "rtl"
                    ? "گزینه ی مد نظر خودر انتخاب کنید"
                    : "select an option"
                }
                itemId={i}
                key={i}
                // defaultValue={this.props.obj.field.type}
                onChange={e => this.SelectOptionOnChangeHandeler(e, i)}
              >
                {fields[i].options.map(x => (
                  <Option value={x.value}>{x.label}</Option>
                ))}
              </Select>
            </div>
          );
        }
      }
    } else {
      return <div></div>;
    }
    return jsxElementArray;
  };

  intialStateBuilder = () => {
    let ElementValues = [];

    if (this.state.form.fields) {
      let fields = [...this.state.form.fields];

      ElementValues.length = fields.length;

      for (let i = 0; i < fields.length; i++) {
        if (!fields[i].hasOptions) {
          switch (fields[i].type) {
            case "Text":
              ElementValues[i] = "";
              break;
            case "Number":
              ElementValues[i] = "";
              break;
            case "Date": //do noting to set it undifin
              break;
            case "Location": //do noting to set it undifin
              ElementValues[i] = [];
              break;
            default:
              console.log("form element not found");
          }
        } else {
          //do noting to set it undifind
        }
      }
    }
    this.setState({ ElementValues: ElementValues });
  };

  inputOnChangeHandeler = e => {
    //itemid is also index of ElementValues
    // console.log(e.target.value);

    let ElementValues = [...this.state.ElementValues];
    ElementValues[e.target.getAttribute("itemId")] = e.target.value; //can also get i directly like others
    this.setState({ ElementValues: ElementValues });
  };
  inputNumberOnChangeHandeler = (e, i) => {
    // console.log(e);
    let ElementValues = [...this.state.ElementValues];
    ElementValues[i] = e;
    this.setState({ ElementValues: ElementValues });
  };
  DatePickerOnChangeHandeler = (e, i) => {
    // console.log(e._d, i);
    let ElementValues = [...this.state.ElementValues];
    ElementValues[i] = e._d;
    this.setState({ ElementValues: ElementValues });
  };
  LocationOnClickHandeler = (i, newPoints) => {
    let ElementValues = [...this.state.ElementValues];
    ElementValues[i] = newPoints;
    this.setState({ ElementValues: ElementValues });
  };
  SelectOptionOnChangeHandeler = (e, i) => {
    let ElementValues = [...this.state.ElementValues];
    ElementValues[i] = e;
    this.setState({ ElementValues: ElementValues });
  };
  submitForm = () => {
    const service = new appService();
    if (this.checker()) {
      service
        .postComplitedFormByClient(this.formatOutput(), this.state.form.id)
        .then(x => {
          notification.success({
            message: this.props.direc === "rtl" ? "عملیات انجام شد" : "Success",
            description:
              this.props.direc === "rtl" ? "فرم ارسال شد" : "ّform is submited",
            placement: this.props.direc === "rtl" ? "bottomLeft" : "bottomRight"
          });
          this.props.history.push("/ShowAllForms");
        })
        .catch(e => {
          notification.error({
            message: this.props.direc === "rtl" ? "عملیات انجام نشد" : "Faild",
            description:
              this.props.direc === "rtl"
                ? "مشکل در ارسال  به سرور"
                : "connection to server has problem",
            placement:
              this.props.direc === "rtl" ? "bottomLeft" : "bottomRight",
            onClick: () => {
              console.log("Notification Clicked!");
            }
          });
        });
    } else {
      notification.error({
        message: this.props.direc === "rtl" ? "عملیات انجام نشد" : "Faild",
        description:
          this.props.direc === "rtl"
            ? "فیلدهای اجباری پر نشده است"
            : "at least one of mandetory filds is not complited",
        placement: this.props.direc === "rtl" ? "bottomLeft" : "bottomRight",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    }
  };
  formatOutput = () => {
    let ElementValues = [...this.state.ElementValues];
    let fields = [...this.state.form.fields];
    console.log(this.state.form);
    let res = {
      title: this.state.form.title,
      id: this.state.form.id,
      type: "formSubmit by client",
      fields: []
    };
    let tempRes = [];

    for (let i = 0; i < fields.length; i++) {
      tempRes.push({ elementName: fields[i].name, answer: ElementValues[i] });
    }
    res.fields = tempRes;
    return res;
  };
  checker = () => {
    let ElementValues = [...this.state.ElementValues];
    let res = true;
    let fields = [...this.state.form.fields];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].required === "true") {
        if (
          !ElementValues[i] ||
          (ElementValues[i] === "" &&
            ElementValues[i] === 0 &&
            ElementValues[i] === [])
        ) {
          res = false;
          break;
        }
      }
    }
    return res;
  };
}

export default ShowSpeceficForm;
