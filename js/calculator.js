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
    var isEmpty=true,firstResult=null;

    // 遍历每个匹配的 input 元素并获取其值
    containers.forEach(function(container) {
        var checked = container.getAttribute('data-checked');
        if(checked=="1"){
          return;
        }
        const main = container.querySelector('.main');
        var myAnswer = "";
        if(main.value !== ""){
          myAnswer = main.value;
        }
        const numerator = container.querySelector('.numerator');
        const denominator = container.querySelector('.denominator');
        if(numerator!=null&&numerator.value!==""){
          if(denominator.value!==""){
            myAnswer+=" '"+numerator.value+'/'+denominator.value+"'";
          }
        }
        if(myAnswer !== ""){
          if(isEmpty){
            isEmpty = false;
          }
          container.setAttribute('data-checked', '1');
          var correct = main.getAttribute("data-correct");
          var result = window.calc.checkResult(correct,myAnswer);
          if(result==null){
            // console.log(correct+" ✅ "+myAnswer,result);
            container.querySelector('.score').textContent = "✅";
          }else{
            main.classList.add('red-text');
            main.value=result.main;
            if(numerator!=null&&result.n!=""){
              numerator.classList.add('red-text');
              numerator.value=result.n;
            }
            if(denominator!=null&&result.d!=""){
              denominator.classList.add('red-text');
              denominator.value=result.d;
            }
            // console.log(correct+" ❌ "+myAnswer,result);
            container.querySelector('.score').textContent = "❌";
          }
          main.disabled  = true;
          if(numerator!=null){
            numerator.disabled  = true;
          }
          if(denominator!=null){
            denominator.disabled  = true;
          }
        }else if (firstResult==null){
          firstResult = container.querySelector('.score');
        }
    });
    if(isEmpty&&firstResult!==null){
        firstResult.textContent = "请先输入答案";
    }
}

function showMessage(element,msg,show){
    //show:"none"||"block"
    // const element = document.getElementById("message");
    element.textContent = msg;
    element.style.display = show;
}

function isNumeric(input) {
  // 使用parseFloat尝试将输入解析为数字
  const number = parseFloat(input);

  // 使用isNaN来检查解析结果是否为有效的数值
  return !isNaN(number);
}

function nextInput(event, currentInput){
  if (event.key === 'Enter' || event.key === ' ') {
    // 如果按下的是回车键（Enter）或空格键
    // 在这里执行相应的操作
    if(!isNumeric(currentInput.value.trim())){
      currentInput.value="";
      return;
    }
    // const container = document.getElementById('result');
    const inputs = document.querySelectorAll('input.my-answer');
    const currentIndex = Array.from(inputs).indexOf(currentInput);
    var checked=0;
    
    if (currentIndex !== -1) {
        var nextIndex = currentIndex + 1;
        while (true) {
          if(checked==inputs.length){
            checkResult();
            return;
          }
          if(nextIndex == inputs.length){
            nextIndex=0;
          }
          const next = inputs[nextIndex];
          ++checked;
          if(!next.disabled&&next.value.trim() === ''){
            next.focus();
            return;
          }else{
            ++nextIndex;
          }
        }
    }
}
}

function onFinish(event){
  // checkResult();
}

function startInput(event){
  if(event.target.readOnly=false){
    event.target.value = "";
  }
}

function getFormulaHtml(question){
  const question2 = question["term"].replace(/\s*'(\d+\/\d+)'/g, (match, fraction) => {
    // 将匹配到的分数字符串进行替换
    return fraction.replace(/(\d+)\/(\d+)/g, '<div class="fraction"><div class="numerator">$1</div><div class="denominator">$2</div></div>');
  });
    // return '<div class="mixed-fraction">'+replacedString+"</div>"
    // +'<p class="my-answer-container">\
    // <input class="my-answer" type="text" placeholder="答案" data-correct="'+question["resultStr"]+'"> \
    // <span class="score"></span>'

    var answer = '<div class="mixed-fraction my-answer-container bg-2">答案:\
    <input class="main my-answer" type="number" placeholder="答案" onkeydown="nextInput(event, this)" onblur="onFinish(event)" onfocus="startInput(event)" data-correct="'+question["resultStr"]+'"/>'
    if(question2.length!=question["term"].length){
      answer += '<div class="fraction">\
      <input class="numerator my-answer" type="number" onkeydown="nextInput(event, this)" onblur="onFinish(event)" onfocus="startInput(event)" placeholder="分子"/>\
      <input class="denominator my-answer" type="number" onkeydown="nextInput(event, this)" onblur="onFinish(event)" onfocus="startInput(event)" placeholder="分母"/>\
      </div>'
    }
    answer += '<span class="score"></span></div>'
    return '<div class="mixed-fraction bg-1">'+question2+'</div>'+answer
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
    document.getElementById('sizeGroup').addEventListener('change', function() {
      nextGroupButton.dispatchEvent(clickEvent);
    });

    nextGroupButton.addEventListener('click', function() {
        var level = parseInt(document.getElementById("levelGroup").value);
        var number = parseInt(document.getElementById("numPerGroup").value);
        var size = parseInt(document.getElementById("sizeGroup").value);
        container.innerHTML = ''; // 清空容器
        if (level) {
            --size;
            const ol = document.createElement('div'); // 创建有序列表元素
            var  questions = [];
            for (let i = 0; i < number; i++) {
                var question = window.calc.genFormula(level,size);
                question["term"] = '<span class="no-part">'+(i+1)+'. </span>'+question["term"];
                const li = document.createElement('div');
                // li.innerHTML = question["term"].replace(/'([^']+)'/g, '<span class="blue-text">$1</span>')
                // +'<p class="my-answer-container"><input class="my-answer" type="text" placeholder="答案" data-correct="'+question["resultStr"]+'"> <span class="score"></span>'
                li.innerHTML = getFormulaHtml(question);
                
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