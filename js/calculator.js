
function checkResult(force=false) {
    // const scoreContainers = document.getElementById("score");
    // showMessage(scoreContainers,"请先输入答案","none");
    // 获取所有具有 "my-answer" 类名的 input 元素
    const containers = document.querySelectorAll('.my-answer-container');

    // 创建一个数组来存储值
    var isEmpty=true,firstResult=null;

    // 遍历每个匹配的 input 元素并获取其值
    var all_checked =0;
    containers.forEach(function(container) {
        var checked = container.getAttribute('data-checked');
        if(checked=="1"){
          ++all_checked;
          return;
        }
        const main = container.querySelector('.main');
        var myAnswer = "";
        if(main.value !== ""){
          myAnswer = main.value;
        }else{
          myAnswer = "0"
        }
        const numerator = container.querySelector('.numerator');
        const denominator = container.querySelector('.denominator');
        if(numerator!=null&&numerator.value!==""){
          if(denominator.value!==""){
            myAnswer+=" "+numerator.value+'/'+denominator.value;
          }
        }
        if(myAnswer !== "" || force){
          if(isEmpty){
            isEmpty = false;
          }
          container.setAttribute('data-checked', '1');
          var correct = main.getAttribute("data-correct");
          var result = window.calc.checkResult(correct,myAnswer);
          console.log(correct,myAnswer,result);
          if(result==null){
            container.querySelector('.score').textContent = "✅";
          }else{
            main.classList.add('red-text');
            if(result.main!="0"||result.n=="0"){
              main.value=result.main;
            }
            if(numerator!=null&&result.n!=""){
              numerator.classList.add('red-text');
              numerator.value=result.n;
            }
            if(denominator!=null&&result.d!=""&&result.d!="1"){
              denominator.classList.add('red-text');
              denominator.value=result.d;
            }
            // console.log(correct+" ❌ "+myAnswer,result);
            if(myAnswer!==""){
              container.querySelector('.score').textContent = "❌";
            }
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
    if(!force&&isEmpty&&firstResult!==null){
        firstResult.textContent = "请先输入答案";
    }
    return all_checked==containers.length;
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

function onStart(){

  const inputs = document.querySelectorAll('input.my-answer');

  if(inputs.length>0){
    inputs[0].focus();

    // const last = inputs[inputs.length-1];
    // last.addEventListener("blur", function(){
    //   // 获取当前具有焦点的元素
    //   const focusedElement = document.activeElement;
    //   // 检查是否是一个 <input> 元素
    //   if (focusedElement.tagName !== "INPUT") {
    //     checkResult();
    //   }
    // });
  }
}

function onLeave(e) {
  if(e.target.value==""){
    e.target.value="0";
  }
}

function nextInput(event, currentInput){
  console.log("nextInput")
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
            if(checkResult()){
              switchQuestions();
            }
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

function startInput(event){
  console.log("startInput "+event.target.disabled);
  if(!event.target.disabled){
    event.target.value = "";
  }
}

function getFormulaHtml(question){
  console.log("question:",question);
  var question2 = question["term"].replace(/\s*'(\d+\/\d+)'/g, (match, fraction) => {
    // 将匹配到的分数字符串进行替换
    return fraction.replace(/(\d+)\/(\d+)/g, '<div class="fraction"><div class="numerator">$1</div><div class="denominator">$2</div></div>');
  });
  // var isMixedFraction = question2.length!=question["term"].length;
  // question2 = question2.replace(/(\d+)\/(\d+)/g, '$1÷$2').replace(/\*/g, '×');
    // return '<div class="mixed-fraction">'+replacedString+"</div>" .replace(/\*/g, '×')
    // +'<p class="my-answer-container">\
    // <input class="my-answer" type="text" placeholder="答案" data-correct="'+question["resultStr"]+'"> \
    // <span class="score"></span>'

    var answer = '<div class="mixed-fraction my-answer-container bg-2">答案:\
    <input class="main my-answer" type="number" placeholder="答案" onkeydown="nextInput(event, this)"  onfocus="startInput(event)" onblur="onLeave(event)" data-correct="'+question["value"]+'"/>'
    if(question2.length!=question["term"].length){
      answer += '<div class="fraction">\
      <input class="numerator my-answer" type="number" onkeydown="nextInput(event, this)"  onfocus="startInput(event)" placeholder="分子"/>\
      <input class="denominator my-answer" type="number" onkeydown="nextInput(event, this)"  onfocus="startInput(event)" placeholder="分母"/>\
      </div>'
    }
    answer += '<span class="score"></span></div>'
    return '<div class="mixed-fraction bg-1">'+question2+'</div>'+answer
}

function switchQuestions(){
  const container = document.getElementById('result');
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
      onStart();
  } else {
    container.textContent = "No option selected.";
  }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numPerGroup').addEventListener('change', function() {
      const container = document.getElementById('result');
      container.innerHTML = ''; 
    });
    document.getElementById('levelGroup').addEventListener('change', function() {
      const container = document.getElementById('result');
      container.innerHTML = ''; 
    });
    document.getElementById('sizeGroup').addEventListener('change', function() {
      const container = document.getElementById('result');
      container.innerHTML = ''; 
    });

    document.getElementById('nextGroup').addEventListener('click', function() {
      switchQuestions();
    });
    document.getElementById('checkResult').addEventListener('click', function() {
      checkResult(true);
    });
    document.getElementById('toc-static').innerHTML="";
    // switchQuestions();
    // const clickEvent = new Event("click");
    // document.getElementById('nextGroup').dispatchEvent(clickEvent);
});