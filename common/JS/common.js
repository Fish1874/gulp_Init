var leiku = {
    post: function (url, param, succ, fail, callback) {
        if (callback) { callback() }
        if (localStorage.getItem('dt_ptyub7')) {
            param.dt_ptyub7 = JSON.parse(localStorage.getItem('dt_ptyub7')).str;
        }
        axios({
            method: "post",
            url: url,
            data: Qs.stringify(param),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (res) {
            if (!res.data.hasOwnProperty('success')) {
                succ(res.data);
            }
            if (!res.data.success) {
                if (res.data.code == 0) {

                    if (fail) {
                        fail(res.data);

                    } else {
                        Vue.prototype.$message.error(res.data.msg)
                    }
                } else if (res.data.code == 1 || res.data.code == 2) {

                    leiku.linkFn({ url: "/demo/zhongheng/zhpc/pages/y_login.html", param: { url: encodeURIComponent(window.location.href) } });
                } /* else if (res.data.code == 3) {

                    leiku.linkFn({ url: "/w/error/error.html", param: { msg: encodeURIComponent(res.data.msg) } });
                } */
				/* if (res.data.code == 2) {
					
				} */
				/* if (res.data.code == 1) {
					
				} else if (res.data.number == 2) {
					//window.location.href = '/w/mobile/404.html?msg=' + res.data.UserName + '账号受限，请联系客服';
				} else {
					if (fail) {
						fail(res.data)
					} else {
						console.log(res.data.msg)
					};
				} */
            } else {
                succ(res.data);
            }
        }).catch(function (err) {
            if (fail) {
                console.log('触发fail')
                fail(err);
            }
        })
    },
    tc(str) {
        layer.open({
            content: str,
            shade: false,
            time: 1.5
        })
    },
    //上传图片
    upload(succ) {
        let ul = new UploadJs({
            before: function () { },
            multiple: false,
            done: function (arr) {
                if (succ) {
                    succ(arr);
                }
            },
            error: function (msg) { }
        });
        ul.open();
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
    //找出url的某个字段
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
    //找出数组重复的元素
    duplicates: function (arr) {
        var result = [];
        arr.forEach(function (item) {
            if (arr.indexOf(item) != arr.lastIndexOf(item) && result.indexOf(item) == -1)
                result.push(item);
        })
        return result;
    },
    //获取非行间样式
    getStyle: function (obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    },
    isXml(arr) {
        var x2js = new X2JS();
        var ob = {
            arr: arr
        };
        var xmlAsStr = x2js.json2xml_str(ob);
        return xmlAsStr;
    },
    isJson(xml) {
        var x2js = new X2JS();
        var jsonAsStr = x2js.xml_str2json(xml);
        return jsonAsStr;
    },

    getDate: function (str) {
        if (str >= 10) {
            return str;
        } else {
            return '0' + str
        }
    },
    getImg(imgs) {
        if (imgs) {
            if (imgs.match(/\/[^.]+\.[a-z]{3,4}/gi)) {
                return imgs.match(/\/[^.]+\.[a-z]{3,4}/gi);
            } else {
                return []
            }
        } else {
            return []
        }
    },
    formatDate: function (datetime) {
        var year = datetime.getFullYear(),
            month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1,
            day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate(),
            hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours(),
            min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes(),
            sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
        return year + '-' + month + '-' + day /* + ' ' + hour + ':' + min + ':' + sec */
    }
}
