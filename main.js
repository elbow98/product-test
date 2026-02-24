
const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');
const themeToggleButton = document.getElementById('theme-toggle-button');
const affiliateForm = document.getElementById('affiliate-form');
const affiliateSubmit = document.getElementById('affiliate-submit');
const affiliateStatus = document.getElementById('affiliate-status');

const THEME_KEY = 'theme';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeelpbpk';

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

affiliateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    affiliateSubmit.disabled = true;
    affiliateStatus.className = '';
    affiliateStatus.textContent = 'Sending inquiry...';

    const formData = new FormData(affiliateForm);

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        affiliateForm.reset();
        affiliateStatus.className = 'success';
        affiliateStatus.textContent = 'Inquiry sent successfully.';
    } catch (error) {
        affiliateStatus.className = 'error';
        affiliateStatus.textContent = 'Failed to send. Please try again.';
    } finally {
        affiliateSubmit.disabled = false;
    }
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
