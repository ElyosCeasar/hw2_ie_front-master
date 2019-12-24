import React, { Component } from "react";
import FormElementForCreating from "../reuseable/formElementForCreating";
import { Button, notification, Input } from "antd";
import appService from "../../services/appService";
class FormCreater extends Component {
  state = {
    title: "Form",
    Elements: [],
    lastId: 0
  };

  render() {
    const { Elements, lastId } = this.props.st;

    console.log(Elements);
    return (
      <div
        style={{
          textAlign: this.props.direc === "rtl" ? "right" : "left"
        }}
      >
        <h3 style={{ color: "white", marginRight: "20px", marginLeft: "20px" }}>
          {this.props.direc === "rtl" ? "ساخت فرم جدید" : "Creating new form"}
        </h3>
        <Input
          value={this.props.st.title}
          onChange={this.handleChangeMainTitle}
          style={{ width: "25%", marginLeft: 20, marginRight: 20 }}
        />

        <Button
          onClick={this.submitForm}
          style={{
            marginBottom: 16,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "lightgreen",
            float: this.props.direc === "rtl" ? "left" : "right"
          }}
        >
          {this.props.direc === "rtl" ? "ساخت فرم" : "Creating form"}
        </Button>
        <Button
          onClick={this.handleAdd}
          style={{
            marginBottom: 16,
            backgroundColor: "yellow",
            float: this.props.direc === "rtl" ? "left" : "right"
          }}
        >
          {this.props.direc === "rtl"
            ? "اضافه کردن سطر جدید"
            : "Adding new row"}
        </Button>
        {Elements.map(el => (
          <FormElementForCreating
            key={el.id}
            obj={el}
            direc={this.props.direc}
            handleChangeType={this.handleChangeType}
            handleChangeName={this.handleChangeName}
            handleChangeTitle={this.handleChangeTitle}
            handleChangeRequired={this.handleChangeRequired}
            handleDelete={this.handleDelete}
            handleChangeHasOption={this.handleChangeHasOption}
            handleChangeOptions={this.handleChangeOptions}
          ></FormElementForCreating>
        ))}
      </div>
    );
  }
  submitForm = () => {
    let checkingResult = true;
    let errorDiscribtion = "";

    const { title, Elements } = this.props.st;
    console.log(Elements);
    if (Elements.length > 0) {
      if (title && title.length > 0) {
        for (let i = 0; i < Elements.length; i++) {
          if (!(Elements[i].field.name && Elements[i].field.title)) {
            errorDiscribtion =
              this.props.direc === "rtl"
                ? "نام آیتم یا نام قابل نمایش آن پر نشده در سطر " + (i + 1)
                : "item name or title is empty in row" + (i + 1);
            checkingResult = false;
            break;
          }
          if (Elements[i].field.hasOptions) {
            // console.log("kk", Elements[i].field);
            if (Elements[i].field.options) {
              let checkopt = true;
              let opt = Elements[i].field.options;
              for (let j = 0; j < opt.length; j++) {
                if (!(opt[j].label && opt[j].value)) {
                  checkopt = false;
                  break;
                }
              }
              if (!checkopt) {
                errorDiscribtion =
                  this.props.direc === "rtl"
                    ? "آپشنی پرنشده است برای سطر " + (i + 1)
                    : "an option is empty in row" + (i + 1);
                checkingResult = false;
                break;
              }
            } else {
              errorDiscribtion =
                this.props.direc === "rtl"
                  ? "حداقل یک آپشن پر شود در سطر " + (i + 1)
                  : "an option is needed in row" + (i + 1);
              checkingResult = false;
              break;
            }
          }
        }
      } else {
        errorDiscribtion =
          this.props.direc === "rtl" ? "نام فرم پر نشده" : "form name is empty";
        checkingResult = false;
      }
    } else {
      errorDiscribtion =
        this.props.direc === "rtl"
          ? "فرم فاقد آیتم هست"
          : "form dose not have any items";
      checkingResult = false;
    }
    const arrayElementsFixer = Elements.map(x => ({
      name: x.field.name,
      title: x.field.title,
      type: x.field.type,
      required: x.field.required,
      hasOptions: x.field.hasOptions,
      options: x.field.options
    }));
    // console.log(arrayElementsFixer);
    const objectToSend = {
      title: title,
      fields: arrayElementsFixer
    };
    //do api call and  change checkingResult if need be
    const service = new appService();
    if (checkingResult) {
      service
        .postNewForm(objectToSend)
        .then(res => (checkingResult = true))
        // .catch(console.log("sdff"));
        .catch(error => (checkingResult = false));
    }
    if (checkingResult) {
      notification.success({
        message: this.props.direc === "rtl" ? "عملیات انجام شد" : "Success",
        description:
          this.props.direc === "rtl"
            ? "ساخت فرم با موفقیت انجام گرفت"
            : "Creating Form is Complited",
        placement: this.props.direc === "rtl" ? "bottomLeft" : "bottomRight",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
      this.props.stateFixerFunc({
        title: "Form",
        Elements: [],
        lastId: 0
      });
    } else {
      notification.error({
        message: this.props.direc === "rtl" ? "عملیات انجام نشد" : "Faild",
        description: errorDiscribtion,
        placement: this.props.direc === "rtl" ? "bottomLeft" : "bottomRight",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    }
  };
  handleAdd = () => {
    // console.log(this.props.st.lastId);
    // console.log(this.props.st.lastId);
    // let lastId = this.props.st.lastId++;
    var Elements = [
      ...this.props.st.Elements,
      {
        id: this.props.st.lastId,
        field: {
          name: "",
          title: "",
          type: "Text",
          required: "false",
          hasOptions: false
        }
      }
    ];
    let lastId = this.props.st.lastId + 1;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: lastId
    });
  };

  handleDelete = id => {
    var Elements = this.props.st.Elements.filter(x => x.id !== id);
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeType = (e, id) => {
    var Elements = [...this.props.st.Elements];
    console.log(Elements);
    const element = Elements.find(x => x.id === id);
    element.field.type = e;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeName = (e, id) => {
    var Elements = [...this.props.st.Elements];
    const element = Elements.find(x => x.id === id);
    element.field.name = e.target.value;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeTitle = (e, id) => {
    var Elements = [...this.props.st.Elements];
    const element = Elements.find(x => x.id === id);
    element.field.title = e.target.value;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeRequired = (e, id) => {
    var Elements = [...this.props.st.Elements];
    const element = Elements.find(x => x.id === id);
    element.field.required = e;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeMainTitle = e => {
    // console.log(e.target.value);
    this.props.stateFixerFunc({
      title: e.target.value,
      Elements: this.props.st.Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeHasOption = (e, id) => {
    var Elements = [...this.props.st.Elements];
    const element = Elements.find(x => x.id === id);
    element.field.hasOptions = e;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
  handleChangeOptions = (e, id) => {
    console.log("e", e);
    var Elements = [...this.props.st.Elements];
    const element = Elements.find(x => x.id === id);
    console.log("el", element);
    element.field.options = e;
    this.props.stateFixerFunc({
      title: this.props.st.title,
      Elements: Elements,
      lastId: this.props.st.lastId
    });
  };
}

export default FormCreater;
