import constants from "../constants";
import defaultConfig from "defaultConfig";

const defaultInfo = {
  userName: "Brain",
  token: "",
  userId: "",
  avatar: ""
};
export const userInfo = (state = defaultInfo, action = {}) => {
  let { type, response } = action;
  switch (type) {
    case constants.SAVEINFO:
      return state = {
        userName: response.suser.name || response.suser.loginName,
        token: response.token,
        // userId: response.userId,
        menuList: response.powerList,
        buttonList: response.btnList
        // avatar: 'http://' + response.avatar
      };
    case constants.LOGINOUT:
      // 保存token
      localStorage.removeItem(`${defaultConfig.productName}-token`);
      return state = defaultInfo;
    default:
      return state;
  }
};