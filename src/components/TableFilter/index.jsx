import React, { useState, t } from 'react';

import styles from "./index.module.scss";

import { Button, Input, Select, Form, Space } from "antd";
import { DatePicker } from "components/Antd";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Item: FormItem } = Form;

// 自定义范围组件
const Range = ({ value = [], onChange, placeholder }) => {
    const [firstValue, setFirstValue] = useState(value[0]);
    const [secondValue, setSecondValue] = useState(value[1]);
    const handleChangeFirst = data => {
        let val = value;
        val[0] = data;
        onChange(val)
    }
    const handleChangeSecond = data => {
        let val = value;
        val[1] = data;
        onChange(val)
    }
    return <div className={`rf ac ${styles.range} ${styles.line}`}>
        <input className={styles['range-input']} value={firstValue} type="text" size="12" placeholder={placeholder && placeholder[0]} onChange={(e) => {
            handleChangeFirst(e.target.value);
        }} />
        <span className={styles.to}></span>
        <input className={styles['range-input']} value={secondValue} type="text" size="12" placeholder={placeholder && placeholder[1]} onChange={(e) => {
            handleChangeSecond(e.target.value);
        }} />
    </div>
}
const FormFilter = (props) => {
    const { config, onFilter, filterRef, initialValues } = props;
    const [form] = Form.useForm();

    const toResetForm = () => {
        form.resetFields();
        // 清空之后再次提交请求列表数据
        form.submit();
    }
    // 可供外部调用的清空筛选栏操作
    const toOnlyReset = () => {
        form.resetFields();
    }
    // 可供外部调用的初始化设置筛选栏数据
    const toOnlySet = (values) => {
        form.setFieldsValue(values);
    }
    if (filterRef) {
        filterRef.current = {
            resetFields: toOnlyReset,
            setFieldsValue: toOnlySet
        }
    }

    return (
        <Form
            form={form}
            className={`rfw ${styles.sort}`}
            layout="inline"
            initialValues={initialValues}
            onFinish={values => {
                onFilter(values);
            }}
        >
            {
                config.map(cfg => {
                    let child, className;
                    let { type, placeholder, data, label, render, options = {}, ...item } = cfg;

                    // 优先render
                    if (render) {
                        className = styles.sortinput;
                        child = render;
                    } else
                        switch (type) {
                            case "input":
                                className = styles.sortinput;
                                child = <Input
                                    placeholder={placeholder ? placeholder : label}
                                    className={styles.line}
                                    allowClear
                                    {...options}
                                />;
                                break;
                            case "select":
                                className = styles.sortinput;
                                child = <Select
                                    placeholder={placeholder ? placeholder : label}
                                    className={styles.line}
                                    allowClear
                                    {...options}
                                >{
                                        data && data.map((dt, index) => (
                                            typeof dt === "object"
                                                ? <Option key={dt.value} value={dt.value}>{dt.label}</Option>
                                                : <Option key={index} value={dt}>{dt}</Option>
                                        ))
                                    }
                                </Select>;
                                break;
                            case "date":
                                className = styles.sortinput;
                                child = <DatePicker
                                    format="YYYY-MM-DD"
                                    className={styles.line}
                                    allowClear
                                    placeholder={placeholder}
                                    {...options}
                                />;
                                break;
                            case "daterange":
                                className = styles.sortrange;
                                child = <RangePicker
                                    format="YYYY-MM-DD"
                                    className={styles.line}
                                    allowClear
                                    placeholder={placeholder}
                                    {...options}
                                />;
                                break;
                            case "range":
                                className = styles.sortrange;
                                child = <Range
                                    allowClear
                                    placeholder={placeholder}
                                    {...options}
                                />;
                                break;
                            default:
                                break;
                        }
                    item.key = item.key ? item.key : item.name;
                    return (
                        <FormItem className={className} {...item}>{child}</FormItem>
                    )
                })
            }
            <FormItem className={styles.sortctrl}>
                <div className={`rf jfe`}>
                    <Space size="middle">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            {t('common.search')}
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={toResetForm}
                        >
                            {t('common.reset')}
                        </Button>
                    </Space>
                </div>
            </FormItem>
        </Form>
    )
}

export default FormFilter;