import React, { useState, useEffect, t } from "react";
import { connect } from "react-redux";

import Url from "utils/api";

import { Upload, Modal, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageUpload = props => {
    const { value, userInfo, listType = "picture-card", multiple, limit = 1, onChange } = props;
    const [fileList, changeFileList] = useState([]);
    const [preview, setPreview] = useState({
        image: "",
        title: ""
    })
    const [previewStatus, changePreview] = useState(false);
    const [uploadStatus, changeUploadStatus] = useState(true);
    const [uploadLock, changeUploadLock] = useState(false);
    // type 1图片 2文件
    const data = {
        // type
    }
    const headers = {
        token: userInfo.token
    }
    // 图片文件类型
    const imgTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

    // 如果token过期，则重新获取token和计算到期时间
    // useEffect(() => {
    //     if (Date.now() > deadline)
    //         requestUploadToken()
    //             .then(responese => {
    //                 saveUploadInfo(responese);
    //             });
    // }, [])

    // 图片预览
    const handlePreview = (file) => {
        if (listType === "file") return;
        if (!file.url) file.url = file.thumbUrl;
        setPreview({
            image: file.url,
            title: file.name
        })
        changePreview(true);
    }
    const handleChange = (files) => {
        // 防止value的改变引起编辑逻辑
        changeUploadLock(true);
        setTimeout(() => {
            changeUploadLock(false);
        }, 300)

        changeFileList(files.fileList);
        // 格式化返回数据
        let data = files.fileList.map(file => {
            if (file.response && file.response.data) return file.response.data;
            else if (file.url) return file.url
        })
        onChange(data.join(','));
    }
    const handlePreviewCancel = () => {
        changePreview(false);
    }
    const handleCheck = (file, checkFileList) => {
        if (!limit) return Promise.resolve();
        // 格式验证
        if (listType === "picture-card") {
            let isImg = imgTypes.includes(file.type);
            if (!isImg) {
                message.error(t('layouts.Upload.limit', { m: imgTypes.map(type => type.split("/")[1]).join("/") }));
                return Promise.reject("");
            }
        }
        // 数量验证
        if (checkFileList.length > limit - fileList.length) {
            message.warning(t('layouts.Upload.exceed'));
            return Promise.reject("");
        } else if (checkFileList.length === limit - fileList.length) {
            setTimeout(() => {
                changeUploadStatus(false)
            }, 400)
        }
    }
    // 已上传数量大于或者等于限制数量，隐藏上传按钮
    useEffect(() => {
        if (limit && fileList.length < limit)
            changeUploadStatus(true)
    }, [fileList])
    // 编辑的时候数据初始化
    useEffect(() => {
        if (value && !uploadLock) {
            let files = value.split(",").map((image, index) => (
                {
                    url: image,
                    uid: index,
                    status: 'done',
                    name: t('layouts.Upload.picture')
                }
            ))
            changeFileList(files);
            if (limit && files.length >= limit)
                changeUploadStatus(false);
        }
    }, [value])
    
    return (
        <>
            <Upload
                action={Url.commonPutFile}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleCheck}
                data={data}
                headers={headers}
                multiple={multiple}
            >
                {
                    listType === "picture-card" ? (
                        uploadStatus && <>
                            {/* <PlusOutlined /> */}
                            <div className="ant-upload-text">{t('common.toUpload')}</div>
                        </>
                    ) : <Button disabled={!uploadStatus} icon={<UploadOutlined />}>{t('common.toUpload')}</Button>
                }
                {/* {
                    (listType === "file") && (
                        <Button disabled={!uploadStatus} icon={<UploadOutlined />}>Upload</Button>
                    )
                } */}
            </Upload>
            <Modal
                visible={previewStatus}
                title={preview.title}
                footer={null}
                onCancel={handlePreviewCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={preview.image} />
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, {})(ImageUpload);