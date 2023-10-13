document.addEventListener('DOMContentLoaded', function() {
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const result = document.getElementById('result');
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function() {
        const value1 = parseFloat(num1.value);
        const value2 = parseFloat(num2.value);
        if (!isNaN(value1) && !isNaN(value2)) {
            result.textContent = 'Result: ' + (value1 + value2);
        } else {
            result.textContent = 'Please enter valid numbers.';
        }
    });
    console.log(window.calc.add(101,202));
});