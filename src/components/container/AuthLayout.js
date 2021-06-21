import React from "react";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const { Content } = Layout;
const AuthLayout = ({ children }) => {
  const history = useHistory();

  return (
    <Layout className="layout">
      <Content className="auth-container">{children}</Content>
    </Layout>
  );
};
AuthLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
AuthLayout.defaultProps = {};
export default AuthLayout;
