import axios from 'axios'
import * as endpoint from './endpoint'

axios.defaults.baseURL = endpoint.APIHOST;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

function _serialize(data) {
    return Object.keys(data).map((keyName) => {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&')
}

// 登陆
export function apiSignin(params) {
    return axios.post(endpoint.signin, _serialize(params)).then(res => {
        return res.data
    })
}

// 注册
export function apiSignup(params) {
  return axios.post(endpoint.signup, _serialize(params)).then(res => {
      return res.data
  })
}
// 首页
export function apiindex(params) {
    return axios.post(endpoint.getindexcode, _serialize(params)).then(res => {
        return res.data
    })
  }

// 活动推荐
export function getactivityapi(params) {
    return axios.get(endpoint.getactivityList,{
        params: params
    }).then(res => {
        return res.data
    })
}
//活动详情
export function getactivityDetailapi(params) {
    return axios.post(endpoint.getactivityDetail, _serialize(params)).then(res => {
        return res.data
    })
}
//游戏列表
export function getgameListapi(params) {
    return axios.post(endpoint.getgameList, _serialize(params)).then(res => {
        return res.data
    })
}
//玩过的游戏
export function getgamePlayedapi(params) {
    return axios.post(endpoint.getgamePlayed, _serialize(params)).then(res => {
        return res.data
    })
}
//礼包列表
export function getgiftListapi(params) {
    return axios.get(endpoint.getgiftList,{
        params: params
    }).then(res => {
        return res.data
    })
}
//礼包领取
export function getgiftapi(params) {
    return axios.get(endpoint.getgift, {
        params: params
    }).then(res => {
        return res.data
    })
}
//礼包记录
export function getgiftRecordapi(params) {
    return axios.get(endpoint.getgiftRecord, {
        params: params
    }).then(res => {
        return res.data
    })
}
//礼包详情
export function getGiftDetailapi(params) {
    return axios.get(endpoint.getGiftDetail, {
        params: params
    }).then(res => {
        return res.data
    })
}
//充值活动列表
export function getpayActivityapi(params) {
    return axios.get(endpoint.getpayActivity, {
        params: params
    }).then(res => {
        return res.data
    })
}
//充值账号切换
export function getchangeAccountapi(params) {
    return axios.get(endpoint.getchangeAccount, {
        params: params
    }).then(res => {
        return res.data
    })
}
//充值记录
export function getrechargeapi(params) {
    return axios.get(endpoint.getrecharge, {
        params: params
    }).then(res => {
        return res.data
    })
}
//我的消息
export function getmessageapi(params) {
    return axios.get(endpoint.getmessage, {
        params: params
    }).then(res => {
        return res.data
    })
}
//我的账户
export function getaccountapi(params) {
    return axios.get(endpoint.getaccount, {
        params: params
    }).then(res => {
        return res.data
    })
}
//游戏详情
export function getgameDetailapi(params) {
    return axios.get(endpoint.getgameDetail, {
        params: params
    }).then(res => {
        return res.data
    })
}
//推荐游戏
export function gethotRecGameapi(params) {
    return axios.get(endpoint.gethotRecGame).then(res => {
        return res.data
    })
}
//攻略列表
export function getgameGuideapi(params) {
    return axios.get(endpoint.getgameGuide, {
        params: params
    }).then(res => {
        return res.data
    })
}
//攻略详情
export function getgameGuideDetailapi(params) {
    return axios.get(endpoint.getgameGuideDetail, {
        params: params
    }).then(res => {
        return res.data
    })
}
//个人资料
export function getuserInfoapi(params) {
    return axios.get(endpoint.getuserInfo, {
        params: params
    }).then(res => {
        return res.data
    })
}
//修改头像
export function getsaveFaceapi(params) {
    return axios.post(endpoint.getsaveFace, _serialize(params)).then(res => {
        return res.data
    })
}
//修改资料
export function getsaveUserapi(params) {
    return axios.post(endpoint.getsaveUser, _serialize(params)).then(res => {
        return res.data
    })
}
//退出登录
export function getlogoutapi(params) {
    return axios.post(endpoint.getlogout, _serialize(params)).then(res => {
        return res.data
    })
}
// 验证码
export function ValidateCodeapi() {
    return endpoint.APIHOST + endpoint.validateCode + '?random=' + Math.random()
}
//校验验证码
export function checkauthcodeapi(params) {
    return axios.post(endpoint.checkauthcode, _serialize(params)).then(res => {
        return res.data
    })
}
//发送邮箱验证码
export function sendValidateCodeByEmailapi(params) {
    return axios.post(endpoint.sendValidateCodeByEmail, _serialize(params)).then(res => {
        return res.data
    })
}
//邮箱绑定
export function emailBindapi(params) {
    return axios.post(endpoint.emailBind, _serialize(params)).then(res => {
        return res.data
    })
}
//发送手机验证码
export function sendValidateCodeBySmsapi(params) {
    return axios.post(endpoint.sendValidateCodeBySms, _serialize(params)).then(res => {
        return res.data
    })
}
//绑定手机号
export function phoneBindapi(params) {
    return axios.post(endpoint.phoneBind, _serialize(params)).then(res => {
        return res.data
    })
}
//是否绑定过邮箱
export function checkEmailapi(params) {
    return axios.get(endpoint.checkEmail, {
        params: params
    }).then(res => {
        return res.data
    })
}
//检查用户是否存在
export function checknameapi(params) {
    return axios.post(endpoint.checkname, _serialize(params)).then(res => {
        return res.data
    })
}
//发送手机验证码（忘记密码）
export function sendValidateCodeapi(params) {
    return axios.post(endpoint.sendValidateCode, _serialize(params)).then(res => {
        return res.data
    })
}
//是否绑定过手机
export function checkPhoneapi(params) {
    return axios.get(endpoint.checkPhone, {
        params: params
    }).then(res => {
        return res.data
    })
}
//发送更绑手机号验证码
export function sendChangeValidateCodeBySmsapi(params) {
    return axios.post(endpoint.sendChangeValidateCodeBySms, _serialize(params)).then(res => {
        return res.data
    })
}
//验证更绑手机号验证码
export function checkChangeSMSCodeapi(params) {
    return axios.post(endpoint.checkChangeSMSCode, _serialize(params)).then(res => {
        return res.data
    })
}
//通过手机修改密码
export function savePasswordByPhoneapi(params) {
    return axios.post(endpoint.savePasswordByPhone, _serialize(params)).then(res => {
        return res.data
    })
}
//发送邮箱验证码（忘记密码）
export function sendValidateCodeLoginapi(params) {
    return axios.post(endpoint.sendValidateCodeLogin, _serialize(params)).then(res => {
        return res.data
    })
}
//通过邮箱修改密码
export function savePasswordByEmailapi(params) {
    return axios.post(endpoint.savePasswordByEmail, _serialize(params)).then(res => {
        return res.data
    })
}
//更绑手机
export function editphoneapi(params) {
    return axios.post(endpoint.editphone, _serialize(params)).then(res => {
        return res.data
    })
}
//发送新手机验证码
export function sendNewValidateCodeBySmsapi(params) {
    return axios.post(endpoint.sendNewValidateCodeBySms, _serialize(params)).then(res => {
        return res.data
    })
}

//充值OK豆和OK币
export function getVirtualCoinapi(params) {
    return axios.get(endpoint.getVirtualCoin, {
        params: params
    }).then(res => {
        return res.data
    })
}

//发送手机验证码(注册)
export function sendPhoneCodeByRegapi(params) {
    return axios.post(endpoint.sendPhoneCodeByReg, _serialize(params)).then(res => {
        return res.data
    })
}
//发送手机验证码(登录)
export function sendPhoneCodeByLoginapi(params) {
    return axios.post(endpoint.sendPhoneCodeByLogin, _serialize(params)).then(res => {
        return res.data
    })
}
//手机登录
export function loginPhoneapi(params) {
    return axios.post(endpoint.loginPhoneReg, _serialize(params)).then(res => {
        return res.data
    })
}
//新闻列表
export function getnewsIndexapi(params) {
    return axios.get(endpoint.newsIndexList, {
        params: params
    }).then(res => {
        return res.data
    })
}
//新闻详情
export function getnewsIndexDetailapi(params) {
    return axios.get(endpoint.newsIndexDetail, {
        params: params
    }).then(res => {
        return res.data
    })
}








