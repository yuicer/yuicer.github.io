---
title: 博客搭建工具 hexo 使用
date: 2016-12-08 17:15:14
categories:
  - 尺工
 
---
<p></p>
<!-- more -->
## 前言
一直都想有一个自己的博客，最后找到了 hexo 这个可以迅速搭建个人博客的工具，在这里记录用法
## 配置
首先安装node，npm，服务器可以使用 githubpages 提供的免费服务，这个服务是 github 对仓库名为 name.github.io 【自己建的仓库】配置了一个服务器，可以直接通过 name.github.io 这个地址访问。
hexo安装后，大多数的配置都在根目录 _config.yml 中，进入文件夹使用 hexo init blog 就会建立blog文件夹并自动安装一个demo和依赖，之后 `npm install hexo-deployer-git --save` ，安装这个后可以通过命令 `hexo deploy` 更新 blog 到 githubpages 上。不过需要配置 _config.yml 下的 deploy 如下，
**name为你自己取的仓库名**
```
deploy:
  type: git
  repo: https://github.com/name/name.github.io.git
  branch: master
```
## 主要命令
	`hexo new [layout]<file> `
	
新建文件，有三种，layout为模式，有draft page post三种 默认为post，即发布模式，draft为草稿模式，page为页面模式，file为文章名字
``` 
hexo server //开启端口4000的本地服务器
hexo generate //渲染生成静态文件网页
hexo deploy //推送到远程站点

hexo new <file>  //默认为post模式，
hexo new draft <flie>//换到草稿模式，草稿模式默认不渲染发布。  
hexo publish [layout] <file>  //将草稿变为发布，layout默认为drafts文件夹，可以理解为写的草稿发布
```

另外有个 scaffolds 文件夹，里面存的是模板, `hexo new [layout] <file>` 中生成的内容就是从这里面读取，在这里修改后以后的 new 出来的初始文件都会跟着改变
[更多详情](https://hexo.io/)

## 主题使用
[hexo主题](https://hexo.io/themes/)
主题推荐使用 next， 这个系统很完善，有各种已经内置好的插件可以直接设置，这是这个主题的 . [官网](http://theme-next.iissnan.com/)
这里内置插件有评论，站点统计，打赏，全站查找，图标，分享，友链等等。具体设置在主题下的 **_config.yml** 文件中。
___________
添加
hexo clean 清除 public 文件夹中的东西，这个在生成文件或者开服务器的时候用下，不然可能会出现莫名其妙的bug

# 自定义样式

来自[浚宇的博客](http://blog.junyu.pro/posts/0009-hexo-next-theme-modify.html)
## 修改侧边栏
在next主题中，比如Pisces中，侧边栏和上边的站点概述中的分类等有联系，如果在首页的上方按钮区域没有新增“分类”、“标签”按钮，那么读者点开侧边栏看到了分类与标签会本能的点击，但是没有效果。如果首页添加了“分类”、“标签”按钮，用户点击了侧边栏，看到了分类与标签字样也是可以点击的，就会在一个页面出现重复的点击位置，用户体验不太好。修改方法
将`your blog dir／themes/next/layout/_macro/sidebar.swig`的文件进行如下修改
 
修改前

```
{% if site.categories.length > 0 %}
    <div class="site-state-item site-state-categories">
        {% if theme.menu.categories %}<a href="{{ url_for(theme.menu.categories) }}">{% endif %}
            <span class="site-state-item-count">{{ site.categories.length }}</span>
            <span class="site-state-item-name">{{ __('state.categories') }}</span>
        {% if theme.menu.categories %}</a>{% endif %}
    </div>
{% endif %}
{% if site.tags.length > 0 %}
    <div class="site-state-item site-state-tags">
        {% if theme.menu.tags %}<a href="{{ url_for(theme.menu.tags) }}">{% endif %}
        <span class="site-state-item-count">{{ site.tags.length }}</span>
        <span class="site-state-item-name">{{ __('state.tags') }}</span>
        {% if theme.menu.tags %}</a>{% endif %}
    </div>
{% endif %}
```
修改后
```
{% if site.categories.length > 0 %}
    <div class="site-state-item site-state-categories">
        <a href="{{ url_for(theme.menu.categories+'/categories') }}">
            <span class="site-state-item-count">{{ site.categories.length }}</span>
            <span class="site-state-item-name">{{ __('state.categories') }}</span>
        </a>
    </div>
{% endif %}
{% if site.tags.length > 0 %}
    <div class="site-state-item site-state-tags">
        <a href="{{ url_for(theme.menu.tags+'/tags') }}">
            <span class="site-state-item-count">{{ site.tags.length }}</span>
            <span class="site-state-item-name">{{ __('state.tags') }}</span>
        </a>
    </div>
{% endif %}
```
## 取消评论数显示
启动“多说”的评论之后，会在博文标题下方增加一行“您有N条评论”的说明字样。对于一个长期的，相当一部分为小众技术类文字的博客来说，这个信息并不是非常重要。另外，考虑到多说的稳定性会影响到这里的显示（这几天就遇到了类似的问题），所以决定去掉显示。
将`your blog dir／themes/next/layout/_macro/post.swig`的文件搜索duoshuo，删掉以下内容,删完后可用<!--shandiao-->代替，以后可再加上
```
{% if post.comments %}
    {% if (theme.duoshuo and theme.duoshuo.shortname) or theme.duoshuo_shortname %}
        <span class="post-comments-count">
            <span class="post-meta-divider">|</span>
            <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
                <span class="post-comments-count ds-thread-count" data-thread-key="{{ post.path }}" itemprop="commentCount"></span>
            </a>
        </span>
    {% elseif theme.facebook_comments_plugin.enable %}
        <span class="post-comments-count">
            <span class="post-meta-divider">|</span>
            <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
                <span class="post-comments-count fb-comments-count" data-href="{{ post.permalink }}" itemprop="commentCount">0</span> comments
            </a>
        </span>
    {% elseif theme.disqus_shortname %}
        <span class="post-comments-count">
            <span class="post-meta-divider">|</span>
            <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
                <span class="post-comments-count disqus-comment-count" data-disqus-identifier="{{ post.path }}" itemprop="commentCount"></span>
            </a>
        </span>
    {% elseif theme.hypercomments_id %}
    <!--noindex-->
        <span class="post-comments-count">
            <span class="post-meta-divider">|</span>
            <span class="post-meta-item-icon">
                <i class="fa fa-comment-o"></i>
                <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
                    <span class="post-comments-count hc-comment-count" data-xid="{{ post.path }}" itemprop="commentsCount"></span>
                </a>
            </span>
        </span>
        <!--/noindex-->
        {% endif %}
    {% endif %}
```
## 修改颜色样式
在 next 主题文件里找到以下几个重要文件
```
highlight.styl
theme.styl
base.styl
```
然后再找到你想要修改的东西去修改就好