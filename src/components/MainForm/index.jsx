import React from "react";

import styles from "./index.module.scss"
import './index.css';

import { Form, Input, Switch, Select } from "antd";
import { DatePicker } from "components/Antd";
import Upload from "components/Upload";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const MainForm = props => {
    const { title = "", items = [], onFinish, ...config } = props;
    const baseConfig = {
        labelCol: { span: 6 },
        wrapperCol: config.layout === "vertical" ? { xl: 18, lg: 20, md: 36 } : { span: 15 }
    }

    return <>
        {title && <p className={styles.maintitle}>{title}</p>}
        <Form className={[styles.mainform, config.layout === "vertical" && `${styles.grid} mainform`]} {...baseConfig} {...config} onFinish={values => {
            onFinish(values);
        }}>{
                items.map(cfg => {
                    let child;
                    let { type, placeholder, render, data, ...item } = cfg;
                    switch (type) {
                        case "input":
                            child = <Input
                                // className={styles.sortinput}
                                placeholder={placeholder ? placeholder : item.label}
                                allowClear
                            />;
                            break;
                        case "textarea":
                            child = <TextArea
                                // className={styles.sortinput}
                                autoSize={{ minRows: 5 }}
                                placeholder={placeholder ? placeholder : item.label}
                            />;
                            break;
                        case "upload":
                            child = <Upload />;
                            break;
                        case "radio":
                            // child = <Upload />;
                            break;
                        case "select":
                            child = <Select
                                placeholder={placeholder ? placeholder : item.label}
                                // className={styles.sortselect}
                                allowClear>{
                                    data && data.map((dt, index) => (
                                        typeof dt === "object"
                                            ? <Option key={dt.key} value={dt.key}>{dt.label}</Option>
                                            : <Option key={index} value={dt}>{dt}</Option>
                                    ))
                                }
                            </Select>;
                            break;
                        case "daterange":
                            child = <RangePicker
                                // format="YYYY-MM-DD"
                                className={styles.sortrange}
                                allowClear
                                placeholder={placeholder}
                            />;
                            break;
                        case "switch":
                            child = <Switch
                                checkedChildren={placeholder && placeholder[0]}
                                unCheckedChildren={placeholder && placeholder[1]}
                            />;
                            break;
                        default:
                            break;
                    }
                    // 优先render
                    if (render) child = render;
                    // 默认情况下key等于该行的name
                    item.key = item.key ? item.key : item.name;
                    return <FormItem {...item}>{child}</FormItem>
                })
            }
        </Form>
    </>
}
export default MainForm;