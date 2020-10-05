var leiku = {
    post: function (url, param, succ, fail, async, callback) {
        param.dt_dj1qko = window.localStorage.getItem("dt_dj1qko") ? JSON.parse(window.localStorage.getItem("dt_dj1qko")).str : '';
        $.ajax({
            type: "POST",
            url: url,
            data: param,
            async: async,
            cache: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            success: function (res) {
                if (res.success) {
                    succ(res);
                } else {
                    console.log(res)
                    if (res.code == 1) {
                        if (res.obj) {
                            if (res.obj.Type == 1) {
                                if (window != top) {


                                    leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                                } else {
                                    leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                                }
                            }
                            if (res.obj.Type == 0) {
                                if (window != top) {
                                    leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                                } else {
                                    leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                                }
                                //window.location.href = "/w/web/yafang/index.html?Id="+res.obj.PageId;
                            }
                        } else {


                            if (window != top) {
                                leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                            } else {
                                leiku.linkFn({ url: "/w/web/yafang/pages/login.html", param: { url: decodeURIComponent(window.location.href) } });
                            }
                        }
                    }




                    if (fail) {
                        fail(res);
                    } else {
                        vant.Toast(res.msg)
                    }
                }
            },
            error: function (err) {
                console.log(vant);
            },
            complete: function (res) {
                if (callback) callback(res);
            }
        })
    },
    linkFn(obj) {
        let param = [],
            str = "";
        if (!obj.param) obj.param = new Object();

        for (var i in obj.param) {
            param.push(i + "=" + obj.param[i]);
        }
        str = param.join("&");

        window.location.href = obj.url + "?" + str;
    },
    //鎵惧嚭url鐨勬煇涓瓧娈�
    GetUrlParam: function (paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        } else {
            return "";
        }
    },
    //鎵惧嚭鏁扮粍閲嶅鐨勫厓绱�
    duplicates: function (arr) {
        var result = [];
        arr.forEach(function (item) {
            if (arr.indexOf(item) != arr.lastIndexOf(item) && result.indexOf(item) == -1)
                result.push(item);
        })
        return result;
    },
    //鑾峰彇闈炶闂存牱寮�
    getStyle: function (obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    }
}