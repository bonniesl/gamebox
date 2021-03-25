import axios from 'axios'


const GAMEHOST = 'https://api.game.okwan.com';//'https://api.game.okwan.com'
const PAYHOST = 'https://pay.okwan.com';//'https://pay.okwan.com'
const ROLEHOST = 'urlConfig.apiRoleUrl';


// game
var gameApi = axios.create({
    baseURL: GAMEHOST
});
gameApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
gameApi.defaults.withCredentials = false

// pay
var payApi = axios.create({
    baseURL: PAYHOST
});
payApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
payApi.defaults.withCredentials = true


// role
var roleApi = axios.create({
    baseURL: ROLEHOST
});
roleApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
roleApi.defaults.withCredentials = false


function _serialize (data) {
  return Object.keys(data).map( (keyName) => {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&')
}

/*
	充值游戏列表
*/
const gameListUrl = '/game/api/index';
export function rechargeApiGetGameList(type) {
	return gameApi.get(gameListUrl, {
		params:{type:type}
	}).then(res=>{
		return res.data
	})
}

/*
    充值服务器列表
*/
const serverList = '/game/api/serverList';
export function rechargeApiGetServerList(gid) {
    return gameApi.get(serverList, {
		params:{gid:gid}
	}).then(res=>{
		return res.data
	})
}

/*
    充值角色列表
*/
const roleList = '/role/roles/getRoleList';
export function rechargeApiGetRoleList(params) {
    return roleApi.get(roleList, {params}).then( res => {
        return res.data;
    })
}

/*
    充值支付
*/
const doRecharge = '/do/index/index';
export function rechargeDoRecharge(params) {
    return payApi.post(doRecharge, _serialize(params)).then(res => {
        return res.data;
    })
}