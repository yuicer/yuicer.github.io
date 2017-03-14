var imgsrc_ = [];
var album_box = new Vue({
	el: "#album_box",
	data: {
		imgsrc: [],
	}
});


(function () {
	window.onload = function () {
		m()
		getimg()

	};
	window.onresize = function () {
		var box = document.getElementById("album_box")
		box.className = ''
		m();
	};

	function m() {
		var box = document.getElementById("album_box"),
			width = box.clientWidth
		if (width < 250)
			box.className = ''
		else if (width < 500)
			box.className = 'a2'
		else if (width < 750)
			box.className = 'a1'
	}

	function getimg() {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4 && req.status == 200) {
				//处理取得的歌词的要放这里面
				var imgsrc1 = req.responseText.split(",");
				for (var i = 0, l = imgsrc1.length; i < l; i++) {
					imgsrc_[i] = "http://olti9qjwg.bkt.clouddn.com" + imgsrc1[i].slice(1);
				}
				album_box.$data.imgsrc = imgsrc_;
			}
		}
		req.open("GET", "./imgsrc.txt", true);
		req.send();
	}
})()
