import React from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

// 获取UUID
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function getUUID() {
    return (S4() + S4() + "-" + S4());
}

// url search参数解析
export function formatSearchMap(key, url) {
    let urlsearch = url ? url.match(/(?:\?)[^#]*/g) : '';
    let _sh = urlsearch ? urlsearch[0].substr(1) : decodeURIComponent(window.location.search.substr(1));
    if (!_sh)
        return null;

    let _search = new URLSearchParams(_sh);
    return key ? _search.get(key) : _search;
}

// 类型判断
export function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}

export function easyModal(message, fn) {
    Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: `是否${message}`,
        okText: '确 认',
        cancelText: '取 消',
        onOk: fn
    });
}

// 根据二进制流导出excel
export function exportExcelFromData(data, filename) {
    let excelBlob = new Blob([data], {
        type: "application/vnd.ms-excel"
    });

    // 创建一个a标签
    let oA = document.createElement("a");
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    oA.href = URL.createObjectURL(excelBlob);
    // 给文件命名
    oA.download = filename;
    // 模拟点击
    oA.click();
}

// 防抖函数
export function debounceFc(func, wait) {
    console.log('_debounceFc')
    let timeout = null;
    return function () {
        const me = null;
        const argu = arguments[0];
        if (timeout) { clearTimeout(timeout); }

        timeout = setTimeout(() => {
            func.call(me, argu);
        }, wait);
    };
}