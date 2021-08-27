import React, { Component, useState, useContext, useEffect, useRef, t } from 'react';

import styles from "./index.module.scss";

import { Table, Form, Input, Select } from 'antd';

const { Item: FormItem } = Form;
const { Option } = Select;

const EditableContext = React.createContext();

const HeadertableCell = ({ editable, ...props }) => {
    if (editable) props.className += ' ant-table-edit-cell';
    return <th {...props} />
}

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({ editable, dataIndex, record, title, children, handleSave, type, data = [], ...props }) => {
    const [editing, changeEditing] = useState(false);
    const form = useContext(EditableContext);
    const inputRef = useRef();

    const toSave = async (e) => {
        const values = await form.validateFields();
        const valuesFilter = Object.entries(values).filter(value => value[1]);
        handleSave({ ...record, ...Object.fromEntries(valuesFilter) });
        changeEditing(!editing);
    }
    const toToggleEdit = () => {
        changeEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex]
        })
    }
    useEffect(() => {
        if (editing)
            inputRef.current.focus();
    }, [editing])

    let childNode = children;

    if (editable) {
        childNode = editing
            ? (
                type === 'select'
                    ? <FormItem
                        name={dataIndex}
                        style={{ marginBottom: 0 }}
                    >
                        <Select ref={inputRef} placeholder={t('common.select', { m: title })} onBlur={toSave}>
                            {
                                data && data.map((dt, index) => (
                                    typeof dt === "object"
                                        ? <Option key={dt.value} value={dt.value}>{dt.label}</Option>
                                        : <Option key={index} value={dt}>{dt}</Option>
                                ))
                            }
                        </Select>
                    </FormItem>
                    : <FormItem
                        name={dataIndex}
                        style={{ marginBottom: 0 }}
                    >
                        <Input ref={inputRef} placeholder={t('common.enter', { m: title })} onBlur={toSave} />
                    </FormItem>
            )
            : (
                <div onClick={toToggleEdit} className={styles["editable-cell-value-wrap"]}>{children}</div>
            )
    }
    return (
        <td {...props}>{childNode}</td>
    )
}

class EditTable extends Component {
    render() {
        const { onEditChange, ...props } = this.props;

        this.props.columns && this.props.columns.forEach(col => {
            if (col.editable) {
                col.onCell = record => ({
                    record,
                    dataIndex: col.dataIndex,
                    editable: col.editable,
                    type: col.type,
                    data: col.data,
                    title: col.title,
                    handleSave: onEditChange
                })
                col.onHeaderCell = column => ({
                    children: column.children,
                    className: column.className,
                    colSpan: column.colSpan,
                    rowSpan: column.rowSpan,
                    style: column.style,
                    title: column.title,
                    editable: column.editable,
                })
            }
        });
        const components = {
            header: {
                cell: HeadertableCell
            },
            body: {
                row: EditableRow,
                cell: EditableCell
            }
        };
        return (
            <Table
                rowClassName={() => styles["editable-row"]}
                components={components}
                {...props} />
        )
    }
}

export default EditTable;