import Axios from "utils/request";

// 登录
export function requestToLogin(payload = {}) {
    return Axios.post("login", payload)
}
// 修改密码
export function requestToChangePassword(payload = {}) {
    return Axios.post("doChange", payload)
}
// 获取七牛token和域名
export function requestUploadToken(payload = {}) {
    return Axios.post("commonGetOSStoken", payload)
}
// 注册
export function requestToRegister(payload = {}) {
    return Axios.post("userRegister", payload)
}
// 重置密码
export function requestResetPassword(payload = {}) {
    return Axios.post("userResetPassword", payload)
}
// 忘记密码(发邮件)
export function requestForgetPassword(payload = {}) {
    return Axios.post("userRetrievePassword", payload)
}
// 获取邮箱验证码
export function requestGetEmailCode(payload = {}) {
    return Axios.post("userGetMailCode", payload)
}