import React, { useState, t } from "react";
import { connect } from 'react-redux';

import { requestToChangePassword } from "service/base";

import { Modal, Form, message } from "antd";
import MainFormItems from "components/MainFormItems";

const ModifyPassword = props => {
    const { visible, onOk, onCancel, lang } = props;
    const [form] = Form.useForm();
    const [loading, changeLoading] = useState(false);
    const config = {
        labelCol: { span: lang === 'zh' ? 5 : 6 },
        wrapperCol: { span: 17 }
    }

    const items = [
        {
            label: t('layouts.ModifyPassword.oldPassword'),
            name: "oldpass",
            type: "input",
            required: true,
            options: {
                type: "password"
            }
        },
        {
            label: t('layouts.ModifyPassword.newPassword'),
            name: "newpass",
            type: "input",
            required: true,
            options: {
                type: "password"
            }
        },
        {
            label: t('layouts.ModifyPassword.confirmPassword'),
            name: "passagain",
            type: "input",
            rules: [{ required: true },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                    let password = getFieldValue('newpass');
                    if (!password || (password && password === value)) {
                        return Promise.resolve();
                    }
                    return Promise.reject(t('layouts.ModifyPassword.confirmPasswordCheck'));
                },
            })
            ],
            options: {
                type: "password"
            }
        }
    ]

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }
    const handleSubmit = values => {
        let payload = {
            ...values
        }
        delete payload.passagain;

        requestToChangePassword(payload)
            .then(() => {
                changeLoading(false);
                message.success(t('layouts.ModifyPassword.resetSuccess'));
                handleCancel();
                setTimeout(() => {
                    onOk();
                }, 500)
            }).catch(() => {
                changeLoading(false);
            })
    }

    return <Modal form={form} title={t('layouts.ModifyPassword.resetPassword')} visible={visible}
        width={600}
        confirmLoading={loading}
        onCancel={handleCancel}
        onOk={() => {
            form.submit();
        }}
    >
        <Form className="form" {...config} form={form} onFinish={values => {
            changeLoading(true);
            handleSubmit(values);
        }}>
            <MainFormItems items={items} />
        </Form>
    </Modal>
}

const mapStateToProps = state => (
    {
        lang: state.lang
    }
)
export default connect(mapStateToProps, {})(ModifyPassword);