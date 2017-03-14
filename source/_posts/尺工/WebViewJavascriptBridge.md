---
title: WebViewJavascriptBridge
categories:
  - 尺工

comments: false
date: 2017-01-17 18:52:20
---
<p></p>
<!-- more -->
# h5
现在的前端，如果在一个有app的公司，经常会有这样的要求，现在要做个活动，你给我做个h5页面，
首先，什么叫做h5页面，明确来说h5指的是h5标签，或者 html5 标准。并没有什么叫做h5页面的玩意，那么为什么现在都有了h5前端工程师这个职位说法了呢?以下是我的个人看法
## h5由来
***********
hybrid app 是这一切的由来，当 web app 和 native app 开始争夺市场的时候，诞生了 hybrid app ，它使的网页能够内嵌到 app 内部里打开，具体实现便是依赖 webview 这一组件。然后由此开发出来的页面用了很多新技术，包括 html5 新增的很多内容【canvas：我是最帅的！】，呈现给用户看到的就是拽酷炫的移动端页面，然后h5这个称呼就莫名其妙的传开了。以至于现在大家一说h5，都知道是做手机页面这种。其实这个说法是不对的。
***********

# webview
webview这个东西是app内的一个组件，有了它，在app内部就可以访问网页了，这也是为什么每一个app内部都能直接打开网页。当然这个组件也有很多坑，被称为移动端的ie6.
## 前端与app通信
如果跑在webview上的页面想跟app之间互相调用方法的话应该怎么做呢？
方法有很多，我知道的是利用 WebViewJavascriptBridge 这个第三方库去做。它的本质也是通过 webview 的代理拦截 scheme 然后注入 js 。
首先需要 ios 或者 android 给 webview 将第三方库加上去。具体代码不知道。。
### 原理
WebViewJavascriptBridge 这个第三方库运行的时候会给网页注入一个js文件，附在最下方，然后web端初始化的时候会去运行它，通过app拦截wvjbscheme这个请求，会去执行这个js文件，给全局添加一个window.WebViewJavascriptBridge 变量，这样就可以去使用它封装的方法。

### web端初始化

```
//window.WebViewJavascriptBridge 为 bridge 的全名
//初始化bridge对象
var isInit = false,
	bridge_ = {};
window.onload = function () {
	function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		}
		if (window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function () {
			document.documentElement.removeChild(WVJBIframe)
		}, 0)
	}
	connectWebViewJavascriptBridge(function (bridge) {
		isInit = true;
		bridge_ = bridge;
	})
}

```
### web端调用app方法
```
if (isInit) {
	bridge_.callHandler('test_web', {
		'data': "test bridge"
	}, function (responseData) {
		console.log("done")
	})
}
```
### web端注册方法给app调用
```
_bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
	console.log('app called web with', data)
	var responseData = { 
		'Javascript Says':'Right back atcha!'
		//传给app内容
	}
	console.log('JS responding with', responseData)
	responseCallback(responseData)
})
```
### web端发消息给app
```
_bridge.send(data, function(responseData) {
	consol.log('web got ', responseData)
});
```
## 注入的js文件
```
;
(function () {
	if (window.WebViewJavascriptBridge) {
		return
	}
	var messagingIframe
	var sendMessageQueue = []
	var messageHandlers = {}

	var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme'
	var QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__'

	var responseCallbacks = {}
	var uniqueId = 1

	function _createQueueReadyIframe(doc) {
		messagingIframe = doc.createElement('iframe')
		messagingIframe.style.display = 'none'
		doc.documentElement.appendChild(messagingIframe)
	}

	function send(data, responseCallback) {
		_doSend({
			data: data
		}, responseCallback)
	}

	function registerHandler(handlerName, handler) {
		messageHandlers[handlerName] = handler
	}

	function callHandler(handlerName, data, responseCallback) {
		_doSend({
			handlerName: handlerName,
			data: data
		}, responseCallback)
	}

	function _doSend(message, responseCallback) {
		if (responseCallback) {
			var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime()
			responseCallbacks[callbackId] = responseCallback
			message['callbackId'] = callbackId
		}
		sendMessageQueue.push(message)
		messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
	}

	function _fetchQueue() {
		var messageQueueString = JSON.stringify(sendMessageQueue)
		sendMessageQueue = []
		return messageQueueString
	}

	function _dispatchMessageFromObjC(messageJSON) {
		setTimeout(function _timeoutDispatchMessageFromObjC() {
			var message = JSON.parse(messageJSON)
			var messageHandler

			if (message.responseId) {
				var responseCallback = responseCallbacks[message.responseId]
				if (!responseCallback) {
					return;
				}
				responseCallback(message.responseData)
				delete responseCallbacks[message.responseId]
			} else {
				var responseCallback
				if (message.callbackId) {
					var callbackResponseId = message.callbackId
					responseCallback = function (responseData) {
						_doSend({
							responseId: callbackResponseId,
							responseData: responseData
						})
					}
				}

				var handler = WebViewJavascriptBridge._messageHandler
				if (message.handlerName) {
					handler = messageHandlers[message.handlerName]
				}

				try {
					handler(message.data, responseCallback)
				} catch (exception) {
					if (typeof console != 'undefined') {
						console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception)
					}
				}
			}
		})
	}

	function _handleMessageFromObjC(messageJSON) {
		_dispatchMessageFromObjC(messageJSON)
	}

	window.WebViewJavascriptBridge = {
		send: send,
		registerHandler: registerHandler,
		callHandler: callHandler,
		_fetchQueue: _fetchQueue,
		_handleMessageFromObjC: _handleMessageFromObjC
	}

	var doc = document
	_createQueueReadyIframe(doc)

	setTimeout(_callWVJBCallbacks, 0);

	function _callWVJBCallbacks() {
		var callbacks = window.WVJBCallbacks;
		delete window.WVJBCallbacks;
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i](WebViewJavascriptBridge);
		}
	}
})();

```
## 更多
### github
for ios
**[marcuswestin/WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)**
某大神补充了 安卓
**[fangj/WebViewJavascriptBridge](https://github.com/fangj/WebViewJavascriptBridge)**

