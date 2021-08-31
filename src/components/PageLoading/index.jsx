import React from 'react';
import { Spin } from 'antd'; // loading components from code split

const pageLoading = () => {
  return (
    <div
      style={{
        paddingTop: 100,
        textAlign: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  )
};

export default pageLoading;