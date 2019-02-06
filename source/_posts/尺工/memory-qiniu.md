---
title: memory_qiniu
categories:
  - 尺工
date: 2019-02-07 00:43:06
---

<p></p>
<!-- more -->

```js
const fs = require('fs')
const path = './qiniu'
const path_album = './qiniu/img/album'
const path_imgsrc = './source/album/imgsrc.txt'
var qiniu = require('qiniu'),
  file_path = [],
  album_file_path = [],
  key = [],
  token = []
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'JSKV4FPbjCQKWAANAn3b9y4IdDGICQY1KGUtzF6q'
qiniu.conf.SECRET_KEY = 'kfN_LcAhfjtyOVFqNd7PZNRPtIpNh0P0kH29mJuR'

//取得所有资源名字并上传到七牛
function get_file_path(path) {
  let files = fs.readdirSync(path)
  for (let i = 0; i < files.length; i++) {
    if (fs.statSync(path + '/' + files[i]).isFile()) {
      file_path.push(path + '/' + files[i])
      if (path == path_album) album_file_path.push(path_album + '/' + files[i])
    } else get_file_path(path + '/' + files[i])
  }
}
get_file_path(path)

//存储 album 下图片的名字
fs.writeFile(path_imgsrc, album_file_path, err => {
  if (err) throw err
  console.log("It's saved!")
})

//要上传的空间
bucket = 'yuicer'

//上传到七牛后保存的文件名
for (let i in file_path) {
  key[i] = file_path[i].substring(2)
}

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
  return putPolicy.token()
}

//生成上传 Token
for (let i in file_path) {
  token[i] = uptoken(bucket, key[i])
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra()
  qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId)
    } else {
      // 上传失败， 处理返回代码
      console.log(err)
    }
  })
}

//调用 uploadFile 上传
for (let i in file_path) {
  uploadFile(token[i], key[i], file_path[i])
}
```
