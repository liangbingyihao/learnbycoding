+++
title = '两步嵌入自定义Javascript和html'
date = 2023-10-21T17:35:44+08:00
draft = false
home = true
summary = "利用Shortcodes两步嵌入自定义Javascript和html"
description = 'Hugo Shortcodes 自定义Javascript 自定义html'
tags= ["Hugo"]
+++

#### 效果如下

{{< custom-html >}}
{{< custom-js >}}

#### 实现方案：使用 Hugo Shortcodes

1. 定义 Shortcodes：  

在Hugo项目中新加文件layouts/shortcodes/custom-js.html
```
<style>
    .red-text {
        color: red;
    }
</style>
<div>
    <input class="red-text" type="text" id="textInput" placeholder="试试输入点东西">
    <div id="result"></div>
</div>
```
以及新文件layouts/shortcodes/custom-html.html
```
<style>
    .red-text {
        color: red;
    }
</style>
<div>
    <input class="red-text" type="text" id="textInput" placeholder="试试输入点东西">
    <div id="result"></div>
</div>
```

2. 引入 Shortcodes：  

然后，在 Markdown 文档中，您可以使用如下引入上述 Shortcode：  
> \{\{< custom-html >\}\}  
\{\{< custom-js >\}\}