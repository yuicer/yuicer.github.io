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
			var req = new XMLHttpRequest(),
				me = this;
			req.onreadystatechange = function () {
				if (req.readyState == 4 && req.status == 200) {
					var imgsrc1 = req.responseText.split(",");
					for (var i = 0, l = imgsrc1.length; i < l; i++) {
						me.imgsrc.unshift("http://olti9qjwg.bkt.clouddn.com" + imgsrc1[i].slice(1) + "-reduce");
					}
				}
			}
			req.open("GET", "./imgsrc.txt", true);
			req.send();
		}
	}
});
