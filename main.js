const themeToggleButton = document.getElementById('theme-toggle-button');
const summaryButton = document.getElementById('refresh-summary');
const summaryStatus = document.getElementById('summary-status');

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
    if (themeToggleButton) {
        themeToggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
};

const comments = [
    '금리와 달러가 같은 방향으로 움직이면 성장주 변동성이 커질 수 있습니다.',
    '지수 상승 시에도 상승 종목 비율이 낮으면 체감 강도는 약할 수 있습니다.',
    '이벤트 직후 반응보다 30~90분 후 재평가 흐름이 더 중요할 때가 많습니다.'
];

const updateSummary = () => {
    const now = new Date();
    const pick = now.getMinutes() % comments.length;
    summaryStatus.textContent = `${comments[pick]} (${now.toLocaleTimeString('ko-KR')})`;
};

applyTheme(getPreferredTheme());

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        toggleTheme();
    });
}

if (summaryButton) {
    summaryButton.addEventListener('click', () => {
        updateSummary();
    });
}

if (summaryStatus) {
    updateSummary();
}
