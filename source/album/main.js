var imgsrc_ = [];
var album_box = new Vue({
	el: "#album_box",
	data: {
		imgsrc: [],
	},
	mounted: function () {
		this.get_img();
	},
	methods: {
		get_img() {
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
	}

});
