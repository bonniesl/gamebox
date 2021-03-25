/**
 * Created by youkong on 2017/4/5.
 */

// require('babel-polyfill')
if (!(window.console && console.log)) {
    console = {
        log: function () {
        },
        debug: function () {
        },
        info: function () {
        },
        warn: function () {
        },
        error: function () {
        }
    };
}

function ajaxCookiePostXHR(url, data, suc, err, method) {
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: method ? method : 'post',
        //加上这句话
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            suc && suc(result);
        },
        error: function (e) {
            err && err(e);
        }
    });
}


var tips = null;
function alertEx(mes) {
    // if (!tips) {
    //     tips = document.createElement('div');
    //     tips.style.display = 'none';
    //     document.body.appendChild(tips);
    //     tips.setAttribute('class', 'tip-toast');
    // }
    // tips.style.display = 'block';
    // tips.innerHTML = '<span>' + mes + '</span>';
    // setTimeout(function () {
    //     tips.style.display = 'none';
    // }, 1500);
    window._vm.$toast.bottom(mes);
}

/**
 * 把url连接转成base64的编码工img使用
 * @param data
 * @returns {string}
 */
function imageGetQrCodeBase64(data) {
    var canvas = document.createElement("div");
    canvas = $(canvas).qrcode({
        render: "canvas",
        text: data.url,
        width: 300,
        height: 300,
        typeNumber: -1,            //计算模式
        colorDark: '#000000',
        colorLight: '#ffffff',
        src: data.logo
    }).find('canvas');
    var dataURL = canvas[0].toDataURL("image/png");
    return dataURL;
}


function getJsdk(suc, err) {
    var url = gameUrl + '/api/pay/getJsDk';
    ajaxCookiePostXHR(url, {}, suc, err, 'get');
}


function payCheck(sn, suc, err) {
    var url = gameUrl + '/api/pay/orderCheck';
    ajaxCookiePostXHR(url, {order: sn}, suc, err, 'get');
}


function pay(data, suc, err) {
    var payData = data;
    if (payData.payType == 37) {
        payData.kxd = payData.amount * 1000;
    }
    var url =urlConfig.pay+'/do';
    ajaxCookiePostXHR(url, data, suc, err, 'post');
}

function getServerList(url, suc, err) {
    ajaxCookiePostXHR(url, {}, suc, err, 'get');
}

function select(element) {
    var selectedText;
    if (element.nodeName === 'SELECT') {
        element.focus();
        selectedText = element.value;
    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');
        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }
        element.select();
        element.setSelectionRange(0, element.value.length);
        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }
        selectedText = element.value;
    } else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        selectedText = selection.toString();
    }
    return selectedText;
}


module.exports = {
    'alertEx': alertEx,
    'imageGetQrCodeBase64': imageGetQrCodeBase64,
    'getJsdk': getJsdk,
    'payCheck': payCheck,
    'pay': pay,
    'select': select,
    'getServerList': getServerList,
};