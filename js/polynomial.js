var lanInThisPage;
const cnTextForLans = {
  answer: ["答案", "int."],
  numerator: ["分子", "num."],
  denominator: ["分母", "denom."],
  detail: ["过程", "detail"]
}
function getTextForLan(lan, k) {
  let texts = cnTextForLans[k]
  if (texts == null || texts == undefined) {
    return k;
  }
  if (lan == "cn") {
    return texts[0];
  } else {
    return texts[1];
  }
}

function checkResult(force = false) {
  // 获取所有具有相同类名的元素
  const elements = document.getElementsByClassName("answer-container");

  // 设置这些元素的可见性
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "visible"; 
  }

}

function showMessage(element, msg, show) {
  //show:"none"||"block"
  // const element = document.getElementById("message");
  element.textContent = msg;
  element.style.display = show;
}

function getFormulaHtml(question) {
  console.log(question)
  return '<math-field readonly>' + question.question + '</math-field><div style="visibility: hidden;" class="answer-container"><math-field readonly>' + question.answer + '</math-field></div>'
}

function switchQuestions() {
  const container = document.getElementById('result');
  var level = parseInt(document.getElementById("levelGroup").value);
  var number = parseInt(document.getElementById("numPerGroup").value);
  var size = parseInt(document.getElementById("sizeGroup").value);
  container.innerHTML = ''; // 清空容器
  if (level) {
    const ol = document.createElement('div'); // 创建有序列表元素
    var questions = [];
    for (let i = 0; i < number; i++) {
      var question = window.calc.genPolynomial(level, size);
      question["term"] = '<span class="no-part">' + (i + 1) + '. </span>' + question["term"];
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
}

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('numPerGroup').addEventListener('change', function () {
  //   const container = document.getElementById('result');
  //   container.innerHTML = '';
  // });
  // document.getElementById('levelGroup').addEventListener('change', function () {
  //   const container = document.getElementById('result');
  //   container.innerHTML = '';
  // });
  // document.getElementById('sizeGroup').addEventListener('change', function () {
  //   const container = document.getElementById('result');
  //   container.innerHTML = '';
  // });

  document.getElementById('nextGroup').addEventListener('click', function () {
    switchQuestions();
  });

  document.getElementById('checkResult').addEventListener('click', function () {
    checkResult(true);
  });

  let lan = document.getElementById("language-select-desktop").value;
  if (lan.indexOf("cn") > 0) {
    lanInThisPage = "cn";
  } else {
    lanInThisPage = "en";
  }
  // document.getElementById('setting').addEventListener('click', function () {
  //   showDialog("hahaha","aaaaaa");
  // });
  // console.log(`{{.Params.custom_html | safeHTML}}`)
  //document.getElementById('toc-static').innerHTML="";
  // switchQuestions();
  // const clickEvent = new Event("click");
  // document.getElementById('nextGroup').dispatchEvent(clickEvent);
});