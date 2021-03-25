/**
 * Created by Administrator on 2017/8/22.
 */
import backend from './backend.js'
//分享到朋友圈
function onMenuShareTimeline(data) {
    wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            data.success && data.success({with: 'share:wxTimeline'});
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
//分享给朋友
function onMenuShareAppMessage(data) {
    wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        type: data.type, // 分享类型,music、video或link，不填默认为link
        dataUrl: data.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            data.success && data.success({with: 'share:wxAppMessage'});
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
//分享到QQ”
function onMenuShareQQ(data) {
    wx.onMenuShareQQ({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            data.success && data.success({with: 'share:qq'});
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

}


function onMenuShareWeibo(data) {
    wx.onMenuShareWeibo({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            data.success && data.success({with: 'share:weibo'});
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}


function onMenuShareQZone(data) {
    wx.onMenuShareQZone({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            data.success && data.success({with: 'share:qznoe'});
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}


function ready(data) {
    wx.ready(function () {
        if (data.shareInfo) {
            onMenuShareTimeline(data.shareInfo);
            onMenuShareAppMessage(data.shareInfo);
            onMenuShareQQ(data.shareInfo);
            onMenuShareWeibo(data.shareInfo);
            onMenuShareQZone(data.shareInfo);
        }


    });
}
window.wxConfig = {};
function init() {
    backend.getJsdk(function (data) {
        if (data.code == 1) {
            data = data.mes;
            wxConfig.appId = data.appId; // 必填，公众号的唯一标识
            wxConfig.timestamp = data.timestamp; // 必填，生成签名的时间戳
            wxConfig.nonceStr = data.nonceStr; // 必填，生成签名的随机串
            wxConfig.signature = data.signature;// 必填，签名，见附录1
            wx.config({
                debug: 0, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxConfig.appId, // 必填，公众号的唯一标识
                timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                signature: wxConfig.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'chooseWXPay',
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
}


function showConfig() {
    console.log(wxConfig)
}

function pay(payData, callback) {

    //alert(location.href.replace(/\/$/, ''));
    //window.history.pushState(null, null, location.href.replace(/\/$/, ''));
    //alert("修改后"+location.href);
    wx.chooseWXPay({
        timestamp: payData.timestamp,
        nonceStr: payData.nonceStr,
        package: payData.package,
        signType: payData.signType, // 注意：新版支付接口使用 MD5 加密
        paySign: payData.paySign,
        success: function (res) {
            // 支付成功后的回调函数
            callback && callback(sn);
        },
        fail: function (res) {
            //if (typeof  res == 'string') {
            //    alert(res)
            //} else {
            //    for (var mss in res) {
            //        alert(res[mss])
            //    }
            //}
        },
        cancel: function (res) {
            console.log(res)
        }
    });
}


var shareInfo = null;
function setShareInfo(data) {
    var shareInfo = {
        title: data.title, // 分享标题
        desc: data.desc || '', // 分享描述
        link: data.link || '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl || '', // 分享图标
        type: data.type || '', // 分享类型,music、video或link，不填默认为link
        dataUrl: data.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: data.success || null
    }
    ready({
        shareInfo: shareInfo
    });
}

export default{
    init: init,
    ready: ready,
    pay: pay,
    showConfig: showConfig,
    setShareInfo: setShareInfo
}


