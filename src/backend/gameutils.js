/**
 * Created by Administrator on 2017/8/1.
 */
export default {
    checkPhone: function (phone) {
        return /^1\d{10}$/.test(phone);
    },
    checkCode: function (code) {
        return /^\w+$/.test(code);
    },
    isKxwanIOS: function () {
        return /app\/haiyunx\/Kxw\/ios/ig.test(navigator.userAgent);
    },
    isIOS: function () {
        return /iPhone|iPod|iPad|Mac/ig.test(navigator.userAgent);
    },
    isAndroid: function () {
        return /android|linux/i.test(navigator.userAgent);
    },
    isKxwanAndroid: function () {
        return /app\/haiyunx\/Kxw\/Android/i.test(navigator.userAgent);
    },
    isWx: function () {
        return /MicroMessenger/i.test(navigator.userAgent);
    },
    isWebAppp: function () {
        return /AppleWebKit.*Mobile.*/i.test(navigator.userAgent);
    },
    getBase64Image: function (img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var dataURL = canvas.toDataURL("image/png");
        return dataURL

        // return dataURL.replace("data:image/png;base64,", "");
    },
    browser: function () {
        //1.安卓, 2.苹果 3.h5(手机浏览器运行的), 4.微信, 5.other(pc浏览器运行的)
        var platform = 5;
        if (this.isWx()) {
            platform = 4;
        } else if (this.isKxwanAndroid()) {
            platform = 1;
        } else if (this.isKxwanIOS()) {
            platform = 2;
        } else if (this.isWebAppp()) {
            platform = 3;
        }
        return platform;
    },
    getParameter: function (name) {
        // 获取 URL 参数
        var reg = new RegExp("[&?](" + name + ")=([^&?#]*)", "i");
        var r = window.location.search.match(reg);
        return r ? r[2] : null;
    },
    setParameter: function (url, name, value) {
        //设置/替换 URL 参数
        url = url.replace(/(#.*)/ig, "");
        var reg = new RegExp("([\?&])" + name + "=([^&]*)(?=&|$)", "i");
        if (reg.test(url)) {
            return url.replace(reg, "$1" + name + "=" + value);
        } else {
            return url + (url.indexOf("?") == -1 ? "?" : "&") + name + "=" + value;
        }
    },
    removeParameter: function (url, name) {
        // 移除 URL 参数
        url = url.replace(/(#.*)/ig, "");
        var reg = new RegExp("([\?&])" + name + "=([^&]*)(?=&|$)", "i");
        if (reg.test(url)) {
            url = url.replace(reg, "");
            if (url.indexOf("?") == -1) url = url.replace("&", "?");
        }
        return url;
    },
    getRandomInt: function (min, max) {
        return parseInt((Math.random() * (max - min + 1)) + min);
    },
    getRandomString: function (len) {
        var base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var str = "";
        for (var i = 0; i < len; i++) {
            var n = this.getRandomInt(1, base.length) - 1;
            str += base.substr(n, 1);
        }
        return str;
    }
}
