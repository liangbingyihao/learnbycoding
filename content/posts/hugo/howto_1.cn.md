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
<script>
    document.addEventListener('DOMContentLoaded', function() {
      const inputElement = document.getElementById('textInput');
      
      // 添加input事件监听器
      inputElement.addEventListener('keydown', function(event) {
          const inputValue = event.target.value;
          document.getElementById('result').innerHTML=event.key
          // 在这里执行你的处理逻辑，比如验证、搜索建议等
      });
      inputElement.addEventListener('blur', function(event) {
        // 输入框失去焦点时，可能输入法窗口已关闭
        // 在这里执行相关操作
          document.getElementById('result').innerHTML="finish"
      });
    })
</script>
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