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

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function() {
        var level = document.querySelector('input[name="level"]:checked');
        level = parseInt(level.value);
        const container = document.getElementById('result');
        container.innerHTML = ''; // 清空容器
        if (level) {
            const ol = document.createElement('ol'); // 创建有序列表元素
            var  questions = [];
            level--;
            for (let i = 0; i < 5; i++) {
                var question = window.calc.genFormula(level);
                
                const li = document.createElement('li');
                li.innerHTML = question["term"].replace(/'([^']+)'/g, '<span class="blue-text">$1</span>');
                ol.appendChild(li);
                questions.push(question);
              }
            container.appendChild(ol); // 将有序列表添加到容器中
          } else {
            container.textContent = "No option selected.";
          }
    });
});