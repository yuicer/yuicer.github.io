var img = {
	number: 0,
	src: ["game_img/bg.jpg", "game_img/up_1.png", "game_img/up_2.png", "game_img/up_3.png", "game_img/up_4.png", "game_img/down_1.png", "game_img/down_2.png", "game_img/down_3.png", "game_img/down_4.png", "game_img/left_1.png", "game_img/left_2.png", "game_img/left_3.png", "game_img/left_4.png", "game_img/right_1.png", "game_img/right_2.png", "game_img/right_3.png", "game_img/right_4.png", "game_img/icicle_1.png", "game_img/icicle_2.png", "game_img/slime_1.png", "game_img/slime_2.png", "game_img/slime_3.png", "game_img/slime_4.png", "game_img/slime_5.png", "game_img/hurt_1.png", "game_img/hurt_2.png", "game_img/die_1.png", "game_img/die_2.png", "game_img/die_3.png", "game_img/die_4.png", "game_img/die_5.png"],
	init: function () {
		var me = img,
			i = 0;
		me.number = 0;
		//判断是对象且不是数组（数组是对象的子集，比对象多一些方法，比如length）
		for (k in img) {
			if (typeof (img[k]) == "object" && typeof (img[k].length) != "number") {
				img[k] = new Image();

				//重绘一个进度条 	
				img[k].onload = function () {
					me.number++;

					game.ctx.lineWidth = 8;
					game.ctx.lineCap = "round";
					game.ctx.strokeStyle = '#fff';
					game.ctx.beginPath();
					game.ctx.moveTo(200, 550);
					game.ctx.lineTo(630, 550);
					game.ctx.stroke();
					game.ctx.beginPath();
					game.ctx.strokeStyle = '#000';
					game.ctx.moveTo(200, 550);
					game.ctx.lineTo(me.number / me.src.length * 400 + 230, 550);
					game.ctx.stroke();
				}

				img[k].src = me.src[i];
				i++;
			}
		}

	},
	complete: function () {
		var me = img;
		if (me.number >= me.src.length)
			return true;
		else
			return false;
	},
	bg: {},
	up_1: {},
	up_2: {},
	up_3: {},
	up_4: {},
	down_1: {},
	down_2: {},
	down_3: {},
	down_4: {},
	left_1: {},
	left_2: {},
	left_3: {},
	left_4: {},
	right_1: {},
	right_2: {},
	right_3: {},
	right_4: {},
	icicle_1: {},
	icicle_2: {},
	slime_1: {},
	slime_2: {},
	slime_3: {},
	slime_4: {},
	slime_5: {},
	hurt_1: {},
	hurt_2: {},
	die_1: {},
	die_2: {},
	die_3: {},
	die_4: {},
	die_5: {},
}
