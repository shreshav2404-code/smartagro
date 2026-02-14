// Theme switching functionality for GreenIQ

// Available themes
const themes = {
    light: {
        name: 'light',
        bodyBackground: '#f0f7f0',
        textColor: '#333',
        cardBackground: '#fff'
    },
    dark: {
        name: 'dark',
        bodyBackground: '#1a1a1a',
        textColor: '#f0f0f0',
        cardBackground: '#2a2a2a'
    },
    nightLight: {
        name: 'nightLight',
        bodyBackground: '#0a1929',
        textColor: '#e0e0e0',
        cardBackground: '#132f4c'
    }
};

// Function to change theme
function changeTheme(themeName) {
    // Save theme preference to localStorage
    localStorage.setItem('preferredTheme', themeName);
    applyTheme(themeName);
}

// Function to apply selected theme
function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;
    
    // Apply theme variables to CSS
    root.style.setProperty('--body-bg', theme.bodyBackground);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--card-bg', theme.cardBackground);
    
    // Update active state in dropdown
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.getAttribute('data-theme') === themeName) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update theme button icon based on selected theme
    const themeIcon = document.querySelector('#themeDropdown i');
    if (themeIcon) {
        if (themeName === 'light') {
            themeIcon.className = 'bi bi-brightness-high-fill';
        } else if (themeName === 'dark') {
            themeIcon.className = 'bi bi-moon-fill';
        } else if (themeName === 'nightLight') {
            themeIcon.className = 'bi bi-stars';
        } else {
            themeIcon.className = 'bi bi-circle-half';
        }
    }
}

// Initialize theme from localStorage or default to light
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS variables to the document
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --body-bg: #f0f7f0;
            --text-color: #333;
            --card-bg: #fff;
        }
        
        body {
            background-color: var(--body-bg);
            color: var(--text-color);
            transition: background-color 0.3s, color 0.3s;
        }
        
        .card, .auth-container {
            background-color: var(--card-bg);
            transition: background-color 0.3s;
        }
    `;
    document.head.appendChild(style);
    
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    applyTheme(savedTheme);
});