import React, { t } from 'react';
import { withRouter } from "react-router-dom";

import styles from "./page.module.scss";

import { Result, Button } from 'antd';

const NoMatch = (props) => {
    return (
        <div className={`rf ac jc ${styles.unusual}`}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => {
                    props.history.push("/");
                }}>{t('common.backHome')}</Button>}
            />
        </div>
    )
}

export default withRouter(NoMatch);