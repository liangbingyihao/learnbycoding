function createOrderedList() {
    const ol = document.createElement('ol'); // 创建有序列表元素

    // 创建并添加带序号的列表项
    for (let i = 1; i <= 5; i++) {
      const li = document.createElement('li');
      li.textContent = `Item ${i}`;
      ol.appendChild(li);
    }

    const container = document.getElementById('result');
    container.innerHTML = ''; // 清空容器
    container.appendChild(ol); // 将有序列表添加到容器中
  }

function checkResult() {
    const scoreContainers = document.getElementById("score");
    showMessage(scoreContainers,"请先输入答案","none");
    // 获取所有具有 "my-answer" 类名的 input 元素
    const containers = document.querySelectorAll('.my-answer-container');

    // 创建一个数组来存储值
    var values = [],isEmpty=true,firstResult=null;

    // 遍历每个匹配的 input 元素并获取其值
    containers.forEach(function(container) {
        const input = container.querySelector('.my-answer')
        if(input.value !== ""){
          if(isEmpty){
            isEmpty = false;
          }
          var correct = input.getAttribute("data-correct");
          console.log(correct+" vs "+input.value);
          var result = window.calc.checkResult(correct,input.value);
          if(result){
            container.querySelector('.score').textContent = "👍";
          }else{
            container.querySelector('.score').textContent = "😄"+correct;
          }
        }else if (firstResult==null){
          firstResult = container.querySelector('.score');
        }
        values.push(input.value);
    });
    if(isEmpty&&firstResult!==null){
        firstResult.textContent = "请先输入答案";
    }

    // 打印值或进行其他操作
    console.log(values);
}

function showMessage(element,msg,show){
    //show:"none"||"block"
    // const element = document.getElementById("message");
    element.textContent = msg;
    element.style.display = show;
}

document.addEventListener('DOMContentLoaded', function() {
    const nextGroupButton = document.getElementById('nextGroup');
    const container = document.getElementById('result');
    document.getElementById('numPerGroup').addEventListener('change', function() {
      nextGroupButton.dispatchEvent(clickEvent);
    });
    document.getElementById('levelGroup').addEventListener('change', function() {
      nextGroupButton.dispatchEvent(clickEvent);
    });

    nextGroupButton.addEventListener('click', function() {
        var level = parseInt(document.getElementById("levelGroup").value);
        var numPerGroup = parseInt(document.getElementById("numPerGroup").value);
        container.innerHTML = ''; // 清空容器
        if (level) {
            const ol = document.createElement('ol'); // 创建有序列表元素
            var  questions = [];
            level--;
            for (let i = 0; i < numPerGroup; i++) {
                var question = window.calc.genFormula(level);
                
                const li = document.createElement('li');
                li.innerHTML = question["term"].replace(/'([^']+)'/g, '<span class="blue-text">$1</span>')
                +'<p class="my-answer-container"><input class="my-answer" type="text" placeholder="答案" data-correct="'+question["resultStr"]+'"> <span class="score"></span>'
                ol.appendChild(li);
                questions.push(question);
              }
            container.appendChild(ol); // 将有序列表添加到容器中
          } else {
            container.textContent = "No option selected.";
          }
    });
    document.getElementById('checkResult').addEventListener('click', function() {
        checkResult();
    });
    const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      });
    nextGroupButton.dispatchEvent(clickEvent);
});