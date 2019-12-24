// export default NavBar;
import { Menu, Icon, Button, Switch } from "antd";
import React from "react";
import Sticky from "react-sticky-el";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    const { isNavbarButtonClicked } = this.props;
    isNavbarButtonClicked();
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { smallSize } = this.props;
    if (smallSize === "true") {
      return this.smallView();
    } else {
      return this.BigView();
    }
  }
  smallView = () => {
    return (
      <Sticky>
        <div
          style={{
            float: this.props.direc === "rtl" ? "right" : "left",
            width: "100%",
            backgroundColor: "#001529"
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            theme="dark"
            style={{
              textAlign: this.props.direc === "rtl" ? "right" : "left"
            }}
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="1">
              <Link to="/ShowAllForms" style={{ color: "white" }}>
                <Icon type="desktop" />
                <span style={{ marginRight: "3px" }}>
                  {this.props.direc === "rtl" ? "مشاهده" : "Show"}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/FormCreater" style={{ color: "white" }}>
                <Icon type="form" />
                <span style={{ marginRight: "3px" }}>
                  {this.props.direc === "rtl" ? "فرم ساخت" : "Creating Form"}
                </span>
              </Link>
            </Menu.Item>

            <Switch
              checkedChildren="Fa"
              unCheckedChildren="En"
              style={{
                float: this.props.direc === "rtl" ? "left" : "right",
                marginTop: "10px",
                marginLeft: "20px",
                marginRight: "20px",
                display: "block"
              }}
              onChange={this.props.onDirectChange}
              checked={this.props.direc === "rtl" ? true : false}
            />
          </Menu>
        </div>
      </Sticky>
    );
  };
  BigView = () => {
    return (
      <Sticky>
        <div
          style={{
            float: this.props.direc === "rtl" ? "right" : "left",
            width: "100%",
            height: "100vh"
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            style={{
              height: "100%",
              textAlign: this.props.direc === "rtl" ? "right" : "left"
            }}
            inlineCollapsed={this.state.collapsed}
          >
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{
                marginTop: "2%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
            >
              <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
            </Button>

            <Menu.Item key="1">
              <Link to="/ShowAllForms" style={{ color: "white" }}>
                <Icon type="desktop" />
                <span style={{ marginRight: "3px" }}>
                  {this.props.direc === "rtl" ? "مشاهده" : "Show"}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/FormCreater" style={{ color: "white" }}>
                <Icon type="form" />
                <span style={{ marginRight: "3px" }}>
                  {this.props.direc === "rtl" ? "فرم ساخت" : "Creating Form"}
                </span>
              </Link>
            </Menu.Item>

            <Switch
              checkedChildren="Fa"
              unCheckedChildren="En"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
              onChange={this.props.onDirectChange}
              checked={this.props.direc === "rtl" ? true : false}
            />
          </Menu>
        </div>
      </Sticky>
    );
  };
}

export default NavBar;
