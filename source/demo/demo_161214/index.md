---
title: demo_滑动
comments: false
date: 2016-12-24 14:54:32
---
### 内部滚动条滑动到最上或者最下的时候不会接着去滑最右边浏览器的滚动条

<html>
<div id="div1" style="width: 200px;
	height: 800px;
	background: #c2c1c1;
	overflow: scroll;">1
	<div id="div2" style="width: 100px;
	height: 1300px;
	background: #727272;">2</div>
</div>
</html>

<style >
#div1 {
	width: 200px;
	height: 1000px;
	background: #c2c1c1;
	overflow: scroll;
}

#div2 {
	width: 100px;
	height: 1500px;
	background: #727272;
}
</style>
<script>



window.onload = function () {
	var a = document.getElementById('div1');
	f(a);
}

//内部到边界不滑动，外部滑动
function f(a) {

	a.addEventListener("DOMMouseScroll", f2)
		//ff
	function f2(e) {
		if (a.scrollTop == 0 && e.detail < 0) {
			e.preventDefault();
			a.removeEventListener("DOMMouseScroll", f2)
			a.addEventListener("DOMMouseScroll", f2)
			return;
		}
		if (a.scrollTop == a.scrollHeight - a.clientHeight && e.detail > 0) {
			e.preventDefault();
			a.removeEventListener("DOMMouseScroll", f2)
			a.addEventListener("DOMMouseScroll", f2)
			return;
		}
	}


	//非ff
	a.onmousewheel = function (e) {
		if (a.scrollTop == 0 && e.wheelDelta > 0)
			return false;
		if (a.scrollTop == a.scrollHeight - a.clientHeight && e.wheelDelta < 0)
			return false;

	}
}


</script>