var qiniu = require("qiniu");
const fs = require('fs')
const path = "./img"
const path_album = "./img/album"
var file_name = [];
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'JSKV4FPbjCQKWAANAn3b9y4IdDGICQY1KGUtzF6q';
qiniu.conf.SECRET_KEY = 'kfN_LcAhfjtyOVFqNd7PZNRPtIpNh0P0kH29mJuR';

//取得所有资源名字
function get_file_name(path) {
	let files = fs.readdirSync(path)
	var Name = []
	for (let i = 0; i < files.length; i++) {
		if (fs.statSync(path + '/' + files[i]).isFile())
			Name.push(path + '/' + files[i])
		else
			get_file_name(path + '/' + files[i])
	}
	return Name;
}
file_name = get_file_name(path)
var imgsrc = get_file_name(path_album)
fs.writeFile('./album/imgsrc.txt', imgsrc, (err) => {
	if (err) throw err;
	console.log('It\'s saved!');
});

//要上传的空间
bucket = 'yuicer';

//上传到七牛后保存的文件名
var key = []
for (let i in file_name) {
	key[i] = file_name[i].substring(2)
}

//构建上传策略函数
function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
	return putPolicy.token();
}

//生成上传 Token
var token = []
for (let i in file_name) {
	token[i] = uptoken(bucket, key[i]);
}

//要上传文件的本地路径
var filePath = []
for (let i in file_name) {
	filePath[i] = file_name[i]
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
	var extra = new qiniu.io.PutExtra();
	qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
		if (!err) {
			// 上传成功， 处理返回值
			console.log(ret.hash, ret.key, ret.persistentId);
		} else {
			// 上传失败， 处理返回代码
			console.log(err);
		}
	});
}

//调用uploadFile上传
for (let i in file_name) {
	uploadFile(token[i], key[i], filePath[i]);
}
