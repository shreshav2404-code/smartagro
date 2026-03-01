// Language switching functionality for GreenIQ

// Function to change language
function changeLanguage(lang) {
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    translations.currentLanguage = lang;
    updatePageContent();
}

// Function to update page content with selected language
function updatePageContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    const currentLang = translations.currentLanguage;
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // For input placeholders
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[currentLang][key]);
            } 
            // For regular content
            else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    translations.currentLanguage = savedLanguage;
    updatePageContent();
});
