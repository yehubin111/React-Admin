import React, { t } from "react";

import styles from "./index.module.scss";

import { Form, Input, Switch, Select, Row, Col, Radio, Checkbox, InputNumber } from "antd";
import { DatePicker, TimePicker } from "components/Antd";
import Upload from "components/Upload";
import Tag from "components/Tag";
const { Item: FormItem } = Form;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

const VerticalItems = ({ col, index, children }) => {
    const col1 = {
        lg: 6,
        md: 12,
        sm: 24,
        xs: 24
    }
    const col2 = {
        xl: { span: 6, offset: 2 },
        lg: { span: 8 },
        md: { span: 12 },
        sm: 24,
        xs: 24
    }
    const col3 = {
        xl: { span: 8, offset: 2 },
        lg: { span: 10 },
        md: { span: 24 },
        sm: 24,
        xs: 24
    }
    return <Col {...(col || eval(`col${index % 3 + 1}`))}>
        {children}
    </Col>
}

const MainFormItems = props => {
    const { items, layout } = props;

    const getItems = (config) => {
        let child;
        let { type, placeholder, render, data, col, options = {}, required, ...item } = config;
        // 20201012新增，简化非空判断规则传参
        if (required) {
            !Array.isArray(item.rules) && (item.rules = []);
            item.rules.push({ required: true, message: t('common.cantBeEmpty', { m: item.label }) })
        }
        // 优先render
        if (render) child = render;
        else
            switch (type) {
                case "input":
                    child = <Input
                        placeholder={placeholder ? placeholder : t('common.enter', { m: item.label })}
                        {...options}
                    />;
                    break;
                case "textarea":
                    child = <TextArea
                        autoSize={{ minRows: 6 }}
                        placeholder={placeholder ? placeholder : t('common.enter', { m: item.label })}
                        {...options}
                    />;
                    break;
                case "number":
                    child = <InputNumber min={1} {...options} />;
                    break;
                case "upload":
                    child = <Upload {...options} />;
                    break;
                case "fileupload":
                    child = <Upload listType="file" {...options} />;
                    break;
                case "radio":
                    child = <RadioGroup className={styles['radio-group']} options={Array.isArray(data) && data} {...options} />
                    break;
                case "checkbox":
                    child = <CheckboxGroup options={Array.isArray(data) && data} {...options} />
                    break;
                case "select":
                    child = <Select
                        placeholder={placeholder ? placeholder : t('common.select', { m: item.label })}
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
                case "selectGroup":
                    child = <Select
                        placeholder={placeholder ? placeholder : t('common.select', { m: item.label })}
                        {...options}
                    >{
                            data && data.map((dt, index) => (
                                <OptGroup label={dt.label} key={index}>
                                    {
                                        dt.children && dt.children.map((child, idx) => (
                                            typeof child === "object"
                                                ? <Option key={child.value} value={child.value}>{child.label}</Option>
                                                : <Option key={idx} value={child}>{child}</Option>
                                        ))
                                    }
                                </OptGroup>
                            ))
                        }
                    </Select>;
                    break;
                case "daterange":
                    child = <RangePicker
                        format="YYYY-MM-DD"
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        {...options}
                    />;
                    break;
                case "date":
                    child = <DatePicker
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        {...options} />
                    break;
                case "timerange":
                    child = <TimeRangePicker
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        {...options}
                    />
                    break;
                case "switch":
                    child = <Switch
                        {...options}
                    />;
                    break;
                case "tag":
                    child = <Tag
                        {...options}
                    />
                    break;
                default:
                    break;
            }
        // 默认情况下key等于该行的name
        item.key = item.key ? item.key : item.name;
        return <FormItem {...item}>{child}</FormItem>
    }
    return layout === "vertical"
        ? <Row gutter={16}>
            {items.map((item, index) => {
                return <VerticalItems col={item.col} index={index} key={item.name}>
                    {getItems(item)}
                </VerticalItems>;
            })}
        </Row>
        : items.map(item => {
            return getItems(item)
        })

}

export default MainFormItems;