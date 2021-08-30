import React from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";

import styles from "./layout.module.scss";
// import defaultConfig from "defaultConfig";

import ContentLayout from "./ContentLayout";

const { Content } = Layout;
// const { copyright } = defaultConfig;

const BlankLayout = props => {
  const { routes, redirectFrom, redirectTo, redirectKey } = props;

  return (
    <Layout className={styles.layout}>
      <Content className="cf jc ac">
        <ContentLayout
          routes={routes}
          redirectFrom={redirectFrom}
          redirectTo={redirectTo}
          redirectKey={redirectKey}
        />
      </Content>
      {/* {copyright && <Footer className={styles.footer}>{copyright}</Footer>} */}
    </Layout>
  );
};

export default withRouter(BlankLayout);
