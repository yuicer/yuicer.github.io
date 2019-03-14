---
title: npm&git
categories:
  - 尺工

date: 2019-01-05 12:16:19
---

<p></p>
<!-- more -->

## npm ci

和 npm 很像，但是它被用来安装一个严格稳定可靠的包，同时项目中必须要有 **package-lock.json or npm-shrinkwrap.json.**

## 建立源仓库

`git init --bare` or `git init name.git --bare`
前一个是把当前地址当作 git clone 目录，后一个是在当前目录再建立一个 name.git 以便 clone
加 --bare 则是会建立裸仓库，不包含工作目录，只有一个 git 目录文件，只做远端的接受推送。

npm 下载去官网或者安装 node 的时候会自带安装，之后在命令行使用就好。
打开命令行的快捷方式（windows 下）

1. shell 脚本
2. win + r
3. 当前文件夹按住 shift 时鼠标右键点击，菜单中会出现**在此处打开命令行**

查看全局安装的包

## npm list -g --depth 0

生成 package.json 文件

## npm init -y

自动生成默认到 package.json 配置

## npm outdated

列出需要更新的包

```
G:\yuicer\test>npm outdated
Package                Current         Wanted  Latest  Location
babel-core             MISSING         6.21.0  6.21.0  test
babel-loader           MISSING         6.2.10  6.2.10  test
babel-preset-es2015    MISSING         6.18.0  6.18.0  test
cross-env              MISSING          3.1.4   3.1.4  test
css-loader             MISSING         0.25.0  0.26.1  test
file-loader            MISSING          0.9.0   0.9.0  test
vue                    MISSING          2.1.8   2.1.8  test
vue-loader             MISSING         10.0.2  10.0.2  test
vue-template-compiler  MISSING          2.1.8   2.1.8  test
webpack                MISSING  2.1.0-beta.28  1.14.0  test
webpack-dev-server     MISSING  2.1.0-beta.12  1.16.2  test
```

`npm install package-name`
如果不加包名则根据 package.json 去安装。

--save -S 安装到 dependencies --save-dev -D 安装到 devDependencies -g 全局安装

现在默认会安装到 dependencies ， 加 -D 会安装到 devDependencies

## git config

--list 检查 git 的配置

```js
git config user.name ddd
git config user.email ddd@email
```

## npm install package@latest | @next

latest 更新 npm 到最新版本
next 跟新 npm 到作者发布到 next 版本

## git submodule add

添加子模块
init 克隆下来后初始化
update 克隆下来后跟新

## npm link

在一个有规范的 package.json 文件目录下使用改命令后会创建一个全局状态的符号链接，即类似于全局安装了这个包
在其他目录下使用 `npm link thisPackage` 会在这里也创建一个包放在 node_modules 下
这个命令有点类似于 `npm install`
取消用 `npm unlink`

## git ssh

mac 用 git 的时候，ssh 已经配置过，但是每次还是得输密码 `Enter passphrase for key 'xxxx'`
解决方法： `ssh-add -K xxx`
emmmmmmm....
竟然不能保存，每回开机都得重新来一次。终极解决方法，在.ssh/文件下，就是放密钥的地方编辑一个 config 文件，如果没有就新建。输入以下内容

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile /Users/mfw/.ssh/id_rsa
```

- 生成 ssh 密钥，

在 git-bash 中，`cat ~/.ssh/id_rsa.pub`用来查看 ssh 密钥，
如果没有则创建 `ssh-keygen -t rsa -C "you@mail.com"` 【你的 git 邮箱】
windows 下用`clip < ~/.ssh/id_rsa.pub`来复制到剪贴板中

## vi 和 vim

vi 是文本编辑器，vim 是 ide 工具，不过一般都会默认将 vim 软连接指向 vi，可以输入 vi，发现和 输入 vim 是一样的
进入 vim

1. a 变成输入模式，
2. esc 结束，
3. :q 退出
4. :q! 强制退出
5. :wq 保存并退出

## folk

看到好的项目之后，可以自己拿过来看看，folk 和 clone 的区别在于 folk 可以继续修改，进行 push 操作。

folk 之后有一个问题是同步，可以设置一个新的远端，然后主动 pull 下来进行更新
一般项目默认有个远端叫做 origin，是指向的自己的项目地址，pull 进行的操作都是从这个默认端。
`git pull origin == git pull`
这里需要新增一个远端
`git remote add newOrigin https:// github.com/baseProject.git`
然后
`git remote -v`
就可以看到有两个 origin ，newOrigin ，之后指定拉取 newOrigin 的内容就可以
`git pull newOrigin master`
进行对应分支的跟新

ps::移除远端
`git remote rm newOrigin`

## pull request

这个和 gitlab 上的 merge request 是一样的。都是提交给他人请求合并，同时也可以方便的 review 代码。

## 版本控制

## git reset --hard 了解一下

推荐[廖雪峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)

ps: HEAD 指的是当前版本
回退上上个版本
`git reset --hard HEAD^^`
查看历史版本,这时就可以看到历史的版本和版本号
`git log or git log --pretty=oneline`
查看所有 log，可以看到所有操作
`git reflog`
跳到某个版本
`git reset --hard [hash code]`

## 切换分支缓存

当在当前分支有了修改但是又需要切到另一个分支的时候，可以用 git stash 存储，之后切换就会有一个干净的分支。之后回来的时候可以 `git stash apply` 再取出来，或者使用另一个命令 `git stash pop` 它相当于 `git stash apply && git stash drop`，当没有冲突的时候会直接取出缓存区并清理缓存区。

## git 合并

这个功能有很多种方式，个人经常用的是 `git pull origin targetBranch`

其他的还有 `git fetch` `git merge`

或者 `git rebase`

个人对后面这两种不是很熟悉。第一种实际上等同于第二种，只不过第二种把命令拆分开来。
第三种没有实际去试过功能

## 切换到远程分支

`git fetch`

`git checkout targetBranch`

在 1.6 以上的版本可以直接用这个命令就可以切换到远程分支上。或者用 `git chekout -b targetBranch origin/targetBranch`

## 丢弃保存的未提交的所有内容

`git checkout .`
