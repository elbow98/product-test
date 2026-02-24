
const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');

generateButton.addEventListener('click', () => {
    generateAndDisplayNumbers();
});

function generateAndDisplayNumbers() {
    numbersContainer.innerHTML = '';
    const lottoNumbers = generateLottoNumbers();
    lottoNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = number;
        numbersContainer.appendChild(numberElement);
    });
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
