const designWidth = 750;

export function pxToRem(val) {
    return hotcss.px2rem(val, designWidth);
}

export function remToPx(val) {
    return hotcss.rem2px(val, designWidth);
}

export const platform = (function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "phone"; //document.writeln("phone");
    } else {
        return "pc"; //document.writeln("pc");
    }
})();

export function getUserAgentDevice() {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) return 'ios'
    if (isAndroid) return 'android'
    return 'other'
}


export function ylTrim(s) {
    if (typeof s === 'string') {
        return s.replace(/^\s+|\s+$/g, "")
    } else {
        return 'not string'
    }
}

export function getParams() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

export function JSONParse(str) {
    if (!str || ylTrim(str).length <= 0) return [];
    return JSON.parse(str);
}

export function objAssign(obj, arr = []) {
    let newObj = Object.assign({}, obj);
    if (arr.length > 0 && arr instanceof Array) {
        arr.forEach((v) => {
            delete newObj[v];
        });
    }
    return newObj;
}

export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

export function filterStr(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].《》<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    var specialStr = "";
    for (var i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }
    return specialStr
}

export function existSpecialChar(str) {
    var specialStr = "~!@#$^&*()=|{}':;',\\[\\].《》<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_"
    for (var i = 0; i < str.length; i++) {
        var code = str.charAt(i)
        if (specialStr.indexOf(code) !== -1) {
            return true
        }
    }
    return false
}


/**
 * 加密类
 * @type {{base64EncodeChars: string, base64encode: code.base64encode}}
 */
export const base64Code = {
    base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64encode: function(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += this.base64EncodeChars.charAt(c1 >> 2);
                out += this.base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += this.base64EncodeChars.charAt(c1 >> 2);
                out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += this.base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += this.base64EncodeChars.charAt(c1 >> 2);
            out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += this.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += this.base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }
}

export function ylSetStore(key, val) {
    // localStorage.setItem( key, JSON.stringify(val) );

    // var hostArr = location.host.split('.');
    // var firstStr = hostArr.pop();
    // var secStr = hostArr.pop();
    // var domain = secStr + '.' + firstStr

    // if (location.host == 'localhost:8080')
    //     domain = '';

    cookie.set(key, encodeURIComponent(JSON.stringify(val)), {
        "expires": 7,
        "path": '/',
        "domain": ''
    });
}

export function ylGetStore(key) {
    // let val = localStorage.getItem(key);
    let val = decodeURIComponent(cookie.get(key));

    try {
        val = JSON.parse(val);
    } catch (err) {
        val = null;
    }

    return val;
}

export function ylRemoveStore(key) {
    // localStorage.removeItem(key);
    cookie.remove(key)
}