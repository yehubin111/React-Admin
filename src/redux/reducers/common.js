import constants from "../constants";


import zh from 'antd/lib/locale/zh_CN';
import en from 'antd/lib/locale/en_US';

import icon_zh from "assets/images/lang/language_zh.png";
import icon_en from "assets/images/lang/language_en.png";

// 国际化列表
const defaultLangList = [
    { value: "zh", label: "中文", icon: <span>🇨🇳</span>, antd: zh, tip: "中文", homeIcon: icon_zh, en: "ZH" },
    { value: "en", label: "English", icon: <span>🇺🇸</span>, antd: en, tip: "英语", homeIcon: icon_en, en: "EN" },
    // { value: "nl", label: "Nederlands", icon: "🇳🇱", tip: "荷兰语", homeIcon: icon_nl, en: "NL" },
    // { value: "de", label: "Deutsch", icon: "🇩🇪", tip: "德语", homeIcon: icon_de, en: "DE" },
    // { value: "fi", label: "suomi", icon: "🇫🇮", tip: "芬兰语", homeIcon: icon_fi, en: "FI" },
    // { value: "es", label: "español", icon: "🇪🇸", tip: "西班牙语", homeIcon: icon_es, en: "ES" },
    // { value: "ca", label: "català", icon: "🇪🇸", tip: "加泰罗尼亚语", homeIcon: icon_es, en: "CA" },
    // { value: "fr", label: "français", icon: "🇫🇷", tip: "法语", homeIcon: icon_fr, en: "FR" }
    // { value: "it", label: "italiano", icon: "🇮🇹", tip: "意大利语", homeIcon: icon_it, en: "IT" }
]

export const langList = (state = defaultLangList, action = {}) => {
    return state;
}

// 当前选择的语言
const defaultLang = window.navigator.language.split("-")[0];

export const lang = (state = defaultLang, action = {}) => {
    let { type, response } = action;

    switch (type) {
        case constants.SAVELANG:
            return state = response;
        default:
            return state;
    }
}


// 页面缓存
const defaultViewCache = [];

export const viewCache = (state = defaultViewCache, action = {}) => {
    let { type, response } = action;
    switch (type) {
        case constants.SAVEVIEWCACHE:
            if (state.some(cache => cache.key === response.key)) return state;
            return state.concat([{
                key: response.key,
                path: response.path,
                i18n: response.meta.i18n
            }])
        case constants.DELVIEWCACHE:
            return state.filter(cache => cache.key !== response);
        default:
            return state;
    }
}