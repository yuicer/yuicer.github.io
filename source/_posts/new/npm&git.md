---
title: npm&git
categories:
  - 尺工

date: 2019-01-05 12:16:19
---

<p></p>
<!-- more -->

### 建立源仓库

`git init --bare` or `git init name.git --bare`
前一个是把当前地址当作 git clone 目录，后一个是在当前目录再建立一个 name.git 以便 clone
加 --bare 则是会建立裸仓库，不包含工作目录，只有一个 git 目录文件，只做远端的接受推送。

npm 下载去官网或者安装 node 的时候会自带安装，之后在命令行使用就好。
打开命令行的快捷方式（windows 下）

1. shell 脚本
2. win + r
3. 当前文件夹按住 shift 时鼠标右键点击，菜单中会出现**在此处打开命令行**

查看全局安装的包

### npm list -g --depth 0

生成 package.json 文件

### npm init -y

自动生成默认到 package.json 配置

### npm outdated

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

### npm link

在一个有规范的 package.json 文件目录下使用改命令后会创建一个全局状态的符号链接，即类似于全局安装了这个包
在其他目录下使用 `npm link thisPackage` 会在这里也创建一个包放在 node_modules 下
这个命令有点类似于 `npm install`
取消用 `npm unlink`

### git ssh

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
