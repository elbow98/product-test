
const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');
const themeToggleButton = document.getElementById('theme-toggle-button');

const THEME_KEY = 'theme';

const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
};

applyTheme(getPreferredTheme());

generateButton.addEventListener('click', () => {
    generateAndDisplayNumbers();
});

themeToggleButton.addEventListener('click', () => {
    toggleTheme();
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
