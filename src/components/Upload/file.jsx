import React, { t, useState } from "react";
import { connect } from "react-redux";

import styles from "./index.module.scss";

import { Upload, message, Button, Drawer } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const FileUpload = props => {
    const { userInfo, name, action, beforeUpload, onUpload, onRemove, onEnd, width = 400, resultRender } = props;
    const [visible, changeVisible] = useState(false);
    // const fileTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

    const handleCheck = (file, checkFileList) => {
        // // 格式验证
        // let isExcel = fileTypes.includes(file.type);
        // if (!isExcel) {
        //     message.error(t('layouts.Upload.limit', { m: fileTypes.map(type => type.split("/")[1]).join("/") }));
        //     return Promise.reject("");
        // }
        // 上传之前情况
        if (beforeUpload && typeof beforeUpload === 'function') beforeUpload();
        return true;
    }
    const onClose = () => {
        changeVisible(false);
        if (onEnd && typeof onEnd === 'function') onEnd();
    }
    const options = {
        name: 'file',
        action,
        headers: {
            token: userInfo.token
        },
        maxCount: 1,
        onChange(info) {
            let { file } = info;
            if (file.status === 'done' && file.response && file.response.code === 0) {
                message.success(t('common.importSuccess'));
                if (onUpload && typeof onUpload === 'function') onUpload(file.response.data)
            }
        },
        onRemove() {
            if (onRemove && typeof onRemove === 'function') onRemove()
        },
        beforeUpload: handleCheck
    };
    return <>
        <Button type="primary" onClick={() => {
            changeVisible(true);
        }}>{name || t('common.import')}</Button>
        <Drawer
            title=""
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={width}
        >
            <div className={styles['dragger-upload']}>
                <Dragger {...options}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">{t('layouts.Upload.pleaseDragger')}</p>
                </Dragger>
            </div>
            <div className={styles['dragger-result']}>{resultRender}</div>
        </Drawer>
    </>
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, {})(FileUpload);