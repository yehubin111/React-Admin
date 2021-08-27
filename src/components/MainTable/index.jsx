import React, { useEffect, useState, useRef, useContext, t } from 'react';

import { useSafeState } from "hooks";
import { wrapContext } from "utils/context";

import TableFilter from "../TableFilter";
import TableHeader from "../TableHeader";
import EditTable from "../EditTable";

const MainTable = props => {
    // 字段映射
    const config = {
        pageSize: 'size',
        pageIndex: 'current',
        dataList: 'data',
        dataTotal: 'total'
    }

    const {
        title,
        filterConfig,
        filterRef,
        filterInitialValues = {},
        headerTab: { config: headerTabConfig, key: headerTabKey } = {},
        headerCtrl,
        tableConfig: { onEditChange, pagination, ...tableConfig } = {},
        tableRender,
        tableRef,
        onRequest,
        onSelect
    } = props;
    const [payload, setPayload] = useState({
        [config.pageIndex]: 1,
        [config.pageSize]: 10
    });
    const _filterRef = useRef();
    const [filterOptions, setFilterOptions] = useState({});
    const [total, setTotal] = useSafeState(0);
    const [dataSource, setDataSource] = useSafeState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, changeLoading] = useSafeState(false);
    const GLOBAL = useContext(wrapContext);
    tableConfig.scroll = {
        x: 'max-content'
    }

    const getListData = (params = payload, type = "") => {
        // loading
        changeLoading(true);
        // 无需分页
        if (pagination === false) {
            delete params[config.pageIndex];
            delete params[config.pageSize];
        }
        // 获取数据
        if (onRequest && typeof onRequest == 'function') {
            let request = onRequest(params, type);
            if (request instanceof Promise)
                request.then(response => {
                    // loading end
                    changeLoading(false);
                    if (!response) return;

                    setDataSource(response[config.dataList]);
                    setTotal(response[config.dataTotal]);
                });
        }
    }
    const toResetFilter = () => {
        setFilterOptions({});
        setPayload({
            ...payload,
            [config.pageIndex]: 1
        })
        _filterRef.current && _filterRef.current.resetFields();
    }

    if (tableRef && typeof tableRef !== 'function') {
        tableRef.current = {
            reload: getListData,
            resetFields: toResetFilter
        };
    }

    const toInitFilterOptions = values => {
        // 外部初始filter初始值的时候，在内部保存下来
        setFilterOptions({
            ...filterOptions,
            ...values
        });
        _filterRef.current && _filterRef.current.setFieldsValue(values)
    }
    /**
     * 20200927新增，头部筛选栏的ref绑定
     * 分内部生成ref，供内部调用
     * 和外部传入ref，返回绑定方法供外部调用
     */
    if (filterRef && typeof filterRef != 'function') {
        filterRef.current = {
            resetFields: _filterRef.current && _filterRef.current.resetFields,
            setFieldsValue: toInitFilterOptions
        }
    }
    useEffect(() => {
        // filter默认值初始化传参只能带入同步设置的值
        let params = {
            ...payload,
            ...filterInitialValues
        }
        // 设置tab
        if (headerTabKey) {
            params[headerTabKey] = headerTabConfig.find(tab => tab.default)?.value ?? "";
            setPayload(params);
        }

        // 设置filter默认值
        if (Object.keys(filterInitialValues).length > 0)
            setFilterOptions(filterInitialValues);

        getListData(params);
    }, [])

    const paginationOption = {
        pageSize: payload[config.pageSize],
        total,
        current: payload[config.pageIndex],
        showSizeChanger: false,
        size: GLOBAL.device === "h5" ? "small" : "default",
        // simple: GLOBAL.device === "h5" ? true : false,
        showTotal: total => t('common.total', { m: total }),
        onChange: (page, pageSize) => {
            let params = {
                ...payload,
                [config.pageIndex]: page,
                [config.pageSize]: pageSize
            }
            setPayload(params);
            getListData({
                ...params,
                ...filterOptions
            }, 'pagination');
        }
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => {
            onSelect && onSelect(keys);
            setSelectedRowKeys(keys);
        }
    }
    return (
        <>
            {filterConfig && <TableFilter onFilter={values => {
                setFilterOptions(values);
                let options = {
                    ...payload,
                    [config.pageIndex]: 1
                }
                setPayload(options)
                let params = {
                    ...options,
                    ...values
                }
                getListData(params, 'filter');
            }} config={filterConfig} filterRef={_filterRef} initialValues={filterInitialValues} />}
            {(headerCtrl || headerTabKey)
                && <TableHeader
                    onTab={(e, t) => {
                        let options = {
                            ...payload,
                            [config.pageIndex]: 1,
                            [headerTabKey]: e
                        }
                        setPayload(options);
                        getListData(options, t);
                    }}
                    tabs={headerTabConfig}
                    ctrl={headerCtrl}
                    title={title} />}
            {tableRender
                ? React.createElement(tableRender, {
                    dataSource,
                    pagination: paginationOption,
                    selectedRowKeys,
                    rowSelection,
                    loading,
                    onInit: getListData,
                    ...tableConfig
                })
                : <EditTable
                    loading={loading}
                    pagination={pagination !== false && paginationOption}
                    dataSource={dataSource}
                    onEditChange={(row) => {
                        let { rowKey } = tableConfig;
                        let newData = [...dataSource];
                        let dataIndex = newData.findIndex(data => data[rowKey] === row[rowKey]);
                        newData.splice(dataIndex, 1, row);
                        onEditChange(newData, dataIndex);
                    }}
                    {...tableConfig}
                />}
        </>
    )
}

export default MainTable;