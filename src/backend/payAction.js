/**
 * Created by Administrator on 2017/8/22.
 */
import backend from './backend.js'
import weixinAction from './weixinAction.js'
import utils from './gameutils.js'

// 判断 iOS 机型
var isIOS = function () {
    return /iPhone|iPod|iPad|Mac/ig.test(navigator.userAgent);
};
/**
 *
 * @param options
 *              {
 *                  payData: 充值的真实数据,
 *                  platform: 当前硬件平台,
 *                  suc: 充值成功,
 *                  close: 充值关闭,
 *                  showIframe: 充值过程显示iframe
 *                  showQrCode: 充值显示二维码
 *              }
 */
function payWx(options) {
    switch (options.platform) {
        case 4:
            weixinAction.showConfig();
            payWxJsdk(options);
            break;
        case 3:
            h5WxPay(options);
            break;
        case 2:
            iosWxPay(options);
            break;
        case 1:
            androidWxPay(options);
            break;
        default:
            qrCodeWxPay(options);
            break;
    }
}
function payAlidata(options) {
    switch (options.platform) {
        case 4:
            backend.alertEx('请使用浏览器打开,或者使用微信');
            break;
        case 3:
            h5AlidataPay(options);
            break;
        case 2:
            iosAlidataPay(options);
            break;
        case 1:
            androidAlidataPay(options);
            break;
        default:
            webAlidataPay(options);
            break;
    }
}


function payWxJsdk(options) {
    //微信公众号支付
    options.payData.payType = 42;
    paySend(options);
}
function androidWxPay(options) {
    //安卓微信支付
    options.payData.payType = 40;
    paySend(options);
}
function iosWxPay(options) {
    //ios微信支付
    options.payData.payType = 40;
    paySend(options);
}
function h5WxPay(options) {
    //h5微信支付
    options.payData.payType = 45;
    paySend(options);
}
function qrCodeWxPay(options) {
    //微信二维码支付
    options.payData.payType = 43;
    paySend(options);
}
function androidAlidataPay(options) {
    //支付宝安卓支付
    options.payData.payType = 41;
    paySend(options);
}
function iosAlidataPay(options) {
    //支付宝ios支付
    options.payData.payType = 41;
    paySend(options);
}
function h5AlidataPay(options) {
    //支付宝h5支付
    options.payData.payType = 44;
    paySend(options);
}
function webAlidataPay(options) {
    //支付宝网页支付
    options.payData.payType = 3;
    paySend(options);
}
function kxbPay(options) {
    options.payData.payType = utils.getParameter('app') == 1 ? 36 : 7;
    paySend(options);
}
function kxdPay(options) {
    options.payData.payType = 26;
    paySend(options);
}


function payCheck(order, suc, err) {
    var timeOut = arguments[3] ? arguments[3] : 1000;
    setTimeout(function () {
        backend.payCheck(order, function (data) {
            if (data.code == 1) {
                suc(data);
            } else {
                payCheck(order, suc, err, timeOut * 2 * 0.8);
            }
        }, err)
    }, timeOut);
}


function paySend(options) {
    backend.pay(options.payData, function (data) {
        if (data.code == 1) {
            if (data.payType == 7 || data.payType == 26 || data.payType == 36 || data.payType == 37) {
                backend.alertEx("充值成功!");
                options.payData.order = data.sn;
                options.suc(options.payData);
            } else {
                payNext(options, data);
            }
        } else {
            backend.alertEx(data.mes);
            options.close(options.payData);
            window.unlock && window.unlock();
        }
    });
}

if (!window.actionEvents) {
    window.actionEvents = {
        events: {},
        addEvent: function (callbackName, func) {
            window.actionEvents.events[callbackName] = [];
            window.actionEvents.events[callbackName].push(func);
        },
        emit: function (callbackName, data) {
            var callback = null;
            while (callback = window.actionEvents.events[callbackName].pop()) {
                callback && callback(data);
            }
        }
    };
}


function payNext(options, data) {
    var check = false;
    options.payData.order = data.sn;

    switch (options.payData.payType) {
        case 3:
            var form = window.document.createElement('form');
            form.action = 'https://mapi.alipay.com/gateway.do';
            form.target = '_blank';

            for (var key  in data.payData) {
                var input = window.document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', data.payData[key]);
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            //form.method = 'post';
            //window.open('https://mapi.alipay.com/gateway.do?' + data.payData);
            check = true;
            break;
        case 40:
            //和app通信
            //data.payData
            window.actionEvents.addEvent('wxPay', function (data) {
                if (data.code == 1) {
                    payCheck(options.payData.order, options.suc, options.close);
                } else {
                    options.close();
                }
            });
            typeof Android != 'undefined' && Android.toRecharge('wxPay', data.payData);
            window.webkit && window.webkit.messageHandlers.gameDialog.postMessage({
                callback: 'wxPay',
                payData: data.payData
            });
            break;
        case 41:
            //和app通信
            window.actionEvents.addEvent('aliPay', function (data) {
                if (data.code == 1) {
                    payCheck(options.payData.order, options.suc, options.close);
                } else {
                    options.close();
                }
            });
            window.webkit && window.webkit.messageHandlers.gameDialog.postMessage({
                callback: 'aliPay',
                payData: data.payData
            });
            typeof Android != 'undefined' && Android.toRecharge('aliPay', data.payData);
            break;
        case 42:
            var _data = data.payData;
            weixinAction.pay({
                timestamp: _data.timestamp,
                nonceStr: _data.nonceStr,
                package: _data.package,
                signType: _data.signType, // 注意：新版支付接口使用 MD5 加密
                paySign: _data.sign
            }, function () {
                payCheck(options.payData.order, options.suc, options.close);
            });
            break;
        case 43:
            //二维码
            check = true;
            options.showQrCode(backend.imageGetQrCodeBase64({url: data.mes.qrCodeUrl}));
            break;
        case 44:
            //iframe
            check = true;
            var url = 'https://mapi.alipay.com/gateway.do?' + data.payData;
            //if (isIOS()) {
                var _d = new Date();
                _d.setTime(_d.getTime() + 1000 * 60 * 10);
                document.cookie = 'payBackUrl=' + location.href + ';domain=' + location.host.replace(/^\w+/, '') + ';path=/;expires=' + _d.toGMTString();
                location.href = url;
            //} else {
            //    options.showIframe(url);
            //}
            break;
        case 45:
            //微信h5
            check = true;
            location.href = data.mes;
            //options.showIframe(data.mes);
            break;
        default:
            break;
    }
    if (check) {
        payCheck(options.payData.order, options.suc, options.close);
    }
}


export default{
    payWx: payWx,
    payAlidata: payAlidata,
    kxbPay: kxbPay,
    kxdPay: kxdPay,
    payCheck: payCheck,
    payNext: payNext
}
