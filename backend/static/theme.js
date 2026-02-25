// Theme switching functionality for GreenIQ

const themes = {
    light: {
        name: 'light',
        '--body-bg': '#f0f7f0',
        '--body-bg-gradient': '#e8f5e9',
        '--text-color': '#2e4d25',
        '--card-bg': '#ffffff',
        '--card-border': 'rgba(56,142,60,0.08)',
        '--navbar-bg': '#1b5e20',
        '--navbar-text': '#ffffff',
        '--input-bg': '#ffffff',
        '--input-border': '#a5d6a7',
        '--input-text': '#333',
        '--chat-bg': '#f9fbe7',
        '--chat-user-bg': '#c8e6c9',
        '--chat-ai-bg': '#ffffff',
        '--chat-sidebar-bg': '#ffffff',
        '--footer-bg': '#1b5e20',
        '--footer-text': '#ffffff',
        '--hero-overlay': 'rgba(27,94,32,0.75)',
        '--weather-bg': '#ffffff',
        '--badge-bg': '#66bb6a',
        '--marquee-bg': '#1b5e20',
        '--link-color': '#2e7d32',
        '--shadow': 'rgba(56,142,60,0.08)',
        '--border-color': '#e0e0e0',
        '--section-alt-bg': '#f5f9f5',
        '--dropdown-bg': '#ffffff',
        '--dropdown-hover': '#e8f5e9',
    },
    dark: {
        name: 'dark',
        '--body-bg': '#121212',
        '--body-bg-gradient': '#1a1a2e',
        '--text-color': '#e0e0e0',
        '--card-bg': '#1e1e2f',
        '--card-border': 'rgba(255,255,255,0.06)',
        '--navbar-bg': '#0d1117',
        '--navbar-text': '#e0e0e0',
        '--input-bg': '#2a2a3d',
        '--input-border': '#3a3a5c',
        '--input-text': '#e0e0e0',
        '--chat-bg': '#1a1a2e',
        '--chat-user-bg': '#2e7d32',
        '--chat-ai-bg': '#2a2a3d',
        '--chat-sidebar-bg': '#1e1e2f',
        '--footer-bg': '#0d1117',
        '--footer-text': '#aaa',
        '--hero-overlay': 'rgba(13,17,23,0.85)',
        '--weather-bg': '#1e1e2f',
        '--badge-bg': '#388e3c',
        '--marquee-bg': '#0d1117',
        '--link-color': '#66bb6a',
        '--shadow': 'rgba(0,0,0,0.3)',
        '--border-color': '#333',
        '--section-alt-bg': '#1a1a2e',
        '--dropdown-bg': '#1e1e2f',
        '--dropdown-hover': '#2a2a3d',
    },
    nightLight: {
        name: 'nightLight',
        '--body-bg': '#0a1929',
        '--body-bg-gradient': '#0d2137',
        '--text-color': '#b2dfdb',
        '--card-bg': '#0d2137',
        '--card-border': 'rgba(178,223,219,0.08)',
        '--navbar-bg': '#051420',
        '--navbar-text': '#b2dfdb',
        '--input-bg': '#132f4c',
        '--input-border': '#1e4976',
        '--input-text': '#b2dfdb',
        '--chat-bg': '#0d2137',
        '--chat-user-bg': '#1b5e20',
        '--chat-ai-bg': '#132f4c',
        '--chat-sidebar-bg': '#0d2137',
        '--footer-bg': '#051420',
        '--footer-text': '#80cbc4',
        '--hero-overlay': 'rgba(5,20,32,0.85)',
        '--weather-bg': '#0d2137',
        '--badge-bg': '#00695c',
        '--marquee-bg': '#051420',
        '--link-color': '#4dd0e1',
        '--shadow': 'rgba(0,0,0,0.4)',
        '--border-color': '#1e4976',
        '--section-alt-bg': '#0a1929',
        '--dropdown-bg': '#0d2137',
        '--dropdown-hover': '#132f4c',
    }
};

function changeTheme(themeName) {
    localStorage.setItem('preferredTheme', themeName);
    applyTheme(themeName);
}

function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;

    // Apply all CSS variables
    Object.keys(theme).forEach(key => {
        if (key.startsWith('--')) {
            root.style.setProperty(key, theme[key]);
        }
    });

    // Set data-theme attribute for CSS selectors
    root.setAttribute('data-theme', themeName);

    // Update active state in dropdown
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-theme') === themeName);
    });

    // Update theme icon
    const themeIcon = document.querySelector('#themeDropdown i');
    if (themeIcon) {
        const icons = { light: 'bi-brightness-high-fill', dark: 'bi-moon-fill', nightLight: 'bi-stars' };
        themeIcon.className = 'bi ' + (icons[themeName] || 'bi-circle-half');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    applyTheme(savedTheme);
});
