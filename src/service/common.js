import Axios from "utils/request";

/**
 * 基础数据
 */
// 国家城市列表
export function requestLocationList(payload = {}) {
    return Axios.post("locationList", payload)
}

// 删除已上传文件
export function requestFileDel(payload = {}) {
    return Axios.post("fileDelete", payload)
}