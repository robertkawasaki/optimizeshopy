// Import translations from languages.js
// This file is now just a wrapper around the languages.js file
// to maintain backward compatibility with existing code

let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (languages[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = languages[lang][key];
            } else {
                element.textContent = languages[lang][key];
            }
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', () => {
    // Create language selector if it doesn't exist
    if (!document.querySelector('.language-selector')) {
        const nav = document.querySelector('.main-nav ul');
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="lang-btn active" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="es">ES</button>
        `;
        nav.appendChild(languageSelector);
    }

    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    // Set initial language based on stored preference or browser language
    const storedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = storedLang || (languages[browserLang] ? browserLang : 'en');
    updateLanguage(initialLang);
}); 