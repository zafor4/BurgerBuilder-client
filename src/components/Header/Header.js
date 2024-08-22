import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";




const mapStateToProps = state => {
  return {
      token: state.token,
  }
}



const Header = (props) => {
  return (
    <div className="Navigation">
      <Navbar
        style={{
          backgroundColor: "#D70F64",
          height: "70px",
        }}
      >
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
          <img src={Logo} alt="Logo" width="80px" />
        </NavbarBrand>
        <Nav className="mr-md-5">
          <NavItem>
            <NavLink to='/orders' className="NavLink">
             Orders
            </NavLink>
          </NavItem>
          {!props.token?<NavItem style={{marginLeft:'20px'}}>
            <NavLink to='/login' className="NavLink">
             Login
            </NavLink>
          </NavItem>:null}
          <NavItem style={{marginLeft:'20px'}}>
            <NavLink to='/logout' className="NavLink">
             Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header)
