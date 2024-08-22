import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/AuthActioncreaters';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

const Logout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.logout();
    navigate('/login'); // Navigate to home after logout
  }, [props, navigate]);

  return null; // No UI to render
};

export default connect(null, mapDispatchToProps)(Logout);
