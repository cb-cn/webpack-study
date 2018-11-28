var xlUrl = {
    dyactiveUrl: "https://dyactive2-vip-ssl.xunlei.com/iface/",
    sendCode: "https://api-u-ssl.xunlei.com/active/Sendcode",//发送手机验证码
    checkCode: "https://api-u-ssl.xunlei.com/active/CheckCode",//验证手机验证码
};

// 生成指定长度的随机字符串
function randomString(len) {
    len = len || 10;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function checkLogin(callback) {
    if (!callback) {
        callback = noop;
    }
    if (haslogin()) {
        callback();
    } else {
        login();
    }
}
function getQueryString() {
    if (!location.search) {
        return {};
    }
    var queryString = {};
    var queryArr = location.search.substring(1).split("&");
    queryArr.forEach(function (item) {
        var itemArr = item.split("=");
        queryString[itemArr[0]] = itemArr[1] || "";
    })
    return queryString;
}
function report(action, extdata) {
    var data = {
        userid: getCookie("userid"),
        usertype: window.userInfo ? window.userInfo.vas_type : undefined,
        is_login: haslogin()?1:0,
        is_vip: window.userInfo ? window.userInfo.isvip : undefined,
        page_id: "xl_taobao_mall",
        platform: "pc",
        from: getQueryString().referfrom
    }
    _.extend(data, extdata)
    window.xladata = {
        type: 'event',
        action: action,
        extdata: data
    }
    window.xla.push(window.xladata);
}
// 空函数
function noop() {
}
// 页面滚动到指点节点
function scrollUtil(node) {
    var windowHeight = $("html")[0].clientHeight;
    var offsetTop = node.offset().top;
    var eleHeight = node.outerHeight(true);
    if (windowHeight > eleHeight) {
        offsetTop -= (windowHeight - eleHeight) / 2;
    }
    $("html").animate({scrollTop: offsetTop}, 600)
}
