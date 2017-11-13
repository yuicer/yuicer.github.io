---
title: 网易云的hash检测。。
categories:
  - 尺工
  - 杂乱
  - 叹言
date: 2017-11-13 17:21:40
---
<p></p>
<!-- more -->

## 前言
闲着没事爬了下，，发现这个玩意写的好糙啊
还是用的一个 iframe 注入。。
```
function isHashChangeSupported() {
    var a = "onhashchange",
        b = a in document.body;
    return b || (document.body.setAttribute(a, "return;"), b = "function" == typeof document.body[a]), b && (void 0 === document.documentMode || document.documentMode > 7)
}

function hashToObject(a) {
    var b, c, d, e, f, g;
    if ("[object String]" === Object.prototype.toString.call(a)) {
        for (0 === a.indexOf("#") && (a = a.substr(1)), b = {}, c = a.split("&"), f = 0, g = c.length; g > f; f++) d = c[f], e = d.split("="), e[0] && (b[decodeURIComponent(e[0])] = decodeURIComponent(e[1]));
        return b
    }
}

function onHashChange() {
    var b, c, d, e;
    location.hash && 1 !== location.hash.length && (b = location.hash.slice(1), c = hashToObject(b), c.to && c.message && (d = top.document.getElementById(c.to), e = d.src, d.contentWindow.location.replace(e.replace(/#.*$/, "") + "#" + encodeURIComponent(c.message))))
}
var monitor = function () {
    var a = location.href;
    return function () {
        var b = location.href;
        b !== a && (onHashChange({
            type: "hashchange",
            oldURL: a,
            newURL: b
        }), a = b)
    }
}();
isHashChangeSupported() ? window.onhashchange = onHashChange : window.setInterval(monitor, 100);
```