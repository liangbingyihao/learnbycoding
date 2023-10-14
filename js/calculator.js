document.addEventListener('DOMContentLoaded', function() {
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const result = document.getElementById('result');
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function() {
        const selectedValue = document.querySelector('input[name="level"]:checked');
        if (selectedValue) {
            var question = window.calc.genFormula(parseInt(selectedValue.value));
            var questionStr = question["term"].replace(/'([^']+)'/g, '<span class="blue-text">$1</span>');
            // result.textContent = question["term"];
            result.innerHTML = questionStr
            // result.textContent = 'This is <span class="red-text">red</span> and this is <span class="blue-text">blue</span>'
          } else {
            result.textContent = "No option selected.";
          }
    });
});