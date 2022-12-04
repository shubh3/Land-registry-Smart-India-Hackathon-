import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


import MaterialIcon, { colorPalette } from "material-icons-react";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePath: props.location.pathname,
      items: [  
        {
          path: "/",
          name: "Home",
          icon: "home",
          key: 1,
        },
        {
          path: "/records",
          name: "Records",
          icon: "description",

          key: 2,
        },
        {
          path: "/main",
          name: "Minting",
          icon: "addchart",
          key: 3,
        },
        {
          path: "/govt",
          name: "Transfer",
          icon: "people",
          key: 4,
        },
        {
          path: "/beneficiary",
          name: "Benificary Schemes",
          icon: "table_chart",
          key: 5,
        },
        {
          path: "/authority",
          name: "Authority",
          icon: "verified_user",
          key: 6,
        },
        // {
        //   path: "/thirdparty",
        //   name: "Third Party Services",
        //   icon: "all_inclusive",
        //   key: 7,
        // },
        {
          path: "/settings",
          name: "Settings",
          icon: "settings",
          key: 7,
        },
      ],
    };
  }

  onItemClick = (path) => {
    this.setState({ activePath: path });
  };

  render() {
    const { items, activePath } = this.state;

    return items.map((item) => {
      return (
        <NavItem
          path={item.path}
          name={item.name}
          icon={item.icon}
          onItemClick={this.onItemClick}
          active={item.path  === activePath}
          key={item.key}
        />
      );
    });
  }
}

const RouterSideNav = withRouter(SideNav);

class NavItem extends React.Component {
  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  };

  render() {
    const { active } = this.props;

    return (
      <div active={active}>
        <NavLink
          to={this.props.path}
          onClick={this.handleClick}
          style={{ textDecoration: "none", color: "#2f3640" }}
        >
          <ListItem button>

            <MaterialIcon icon={this.props.icon}  />

            <ListItemText primary={this.props.name} style={{ marginLeft: "2rem" }}/>
          </ListItem>
        </NavLink>
      </div>
    );
  }
}

export default class Sidebar extends React.Component {
  render() {
    return <RouterSideNav></RouterSideNav>;
  }
}
