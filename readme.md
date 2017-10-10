改变：

禁用了打赏功能，因为在图片focus的时候下边的字一直转，难看！
禁用了分享功能，难看！
禁用了字体，没发现有什么改变
代码块颜色再稍微深一点
字体颜色由#555改为#333
多说评论禁用
背景
themes/next/layout/_macro/post.swig 删掉一段
  <div>
      {% if not is_index %}
        {% include 'wechat-subscriber.swig' %}
      {% endif %}
    </div>

    <div>
      {% if not is_index %}
        {% include 'reward.swig' %}
      {% endif %}
    </div>
文章的tag做整理
tags标签去掉
添加日志，关于页面

待做：

categories 分类这个不能生成 categories 目录下的 index 文件

