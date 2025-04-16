// Language detection and translation module
class Translator {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Load saved language preference or use browser language
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && translations[savedLang]) {
            this.currentLang = savedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                this.currentLang = browserLang;
            }
        }

        // Create language selector
        this.createLanguageSelector();
        
        // Initial translation
        this.translatePage();
    }

    createLanguageSelector() {
        const header = document.querySelector('header');
        const nav = document.querySelector('.main-nav');
        
        const langSelector = document.createElement('div');
        langSelector.className = 'language-selector';
        
        const languages = Object.keys(translations);
        languages.forEach(lang => {
            const button = document.createElement('button');
            button.className = `lang-btn ${lang === this.currentLang ? 'active' : ''}`;
            button.textContent = lang.toUpperCase();
            button.addEventListener('click', () => this.switchLanguage(lang));
            langSelector.appendChild(button);
        });

        nav.appendChild(langSelector);
    }

    switchLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            this.translatePage();
            
            // Update active state of language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
            });
        }
    }

    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }
}

// Initialize translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translator = new Translator();
}); 