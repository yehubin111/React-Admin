import constants from "./constants";

// common
// 登录保存用户信息
export const saveUserInfo = response => {
  return {
    type: constants.SAVEINFO,
    response
  };
};
// 保存七牛信息
// export const saveUploadInfo = response => {
//   return {
//     type: constants.SAVEUPLOADINFO,
//     response
//   }
// }
// 退出登录
export const toLoginOut = response => {
  return {
    type: constants.LOGINOUT,
    response
  }
}
/**
 * base基础数据
 * @param {*} response 
 */
export const saveTopic = response => {
  return {
    type: constants.SAVETOPIC,
    response
  }
}
// 保存商品管理列表
export const saveProductList = response => {
  return {
    type: constants.SAVEPRODUCT,
    response
  }
}
// 保存用户管理列表
export const saveUserList = response => {
  return {
    type: constants.SAVEUSERLIST,
    response
  };
};
// 保存邀请码管理列表
export const saveInvitationList = response => {
  return {
    type: constants.SAVEINVITATIONLIST,
    response
  }
}
// 保存banner管理列表
export const saveBannerList = response => {
  return {
    type: constants.SAVEBANNERLIST,
    response
  }
}
// 保存选择的语言
export const saveLang = response => {
  return {
    type: constants.SAVELANG,
    response
  }
}

// 保存页面缓存
export const saveViewCache = response => {
  return {
    type: constants.SAVEVIEWCACHE,
    response
  }
}

// 删除页面缓存
export const delViewCache = response => {
  return {
    type: constants.DELVIEWCACHE,
    response
  }
}