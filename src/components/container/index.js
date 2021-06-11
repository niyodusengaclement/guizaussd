import React from 'react';
import { Layout, PageHeader } from 'antd';
import moment from 'moment';
import { useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../navbar';

const { Content, Footer } = Layout;
const Container = ({ children, pageTitle, extraHeaders }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleOnIdle = () => {
    localStorage.setItem(
      'loggedout',
      JSON.stringify({
        message: 'You are logged out due to the long time of inactivity',
        path: `${window.location.pathname}${window.location.search}`,
      }),
    );
    logout();
  };

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
  });

  return (
    <Layout className="layout">
      <Navbar />
      <Content style={{ padding: '0 50px' }}>
        <PageHeader
          ghost
          onBack={() => history.goBack()}
          title={pageTitle || ''}
          extra={[...(extraHeaders || [])]}
        />
        <Layout className="site-layout">{children}</Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Gwiza ©{moment().format('YYYY')} - Powered by MVend Ltd
      </Footer>
    </Layout>
  );
};
Container.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  pageTitle: PropTypes.string.isRequired,
  extraHeaders: PropTypes.arrayOf(PropTypes.element),
};
Container.defaultProps = {
  extraHeaders: [],
};
export default Container;
