class I18n {
    constructor() {
        this.currentLang = 'en';
        this.translations = languages;
        this.init();
    }

    init() {
        // Add loading state to body
        document.body.classList.add('i18n-loading');
        
        // Force English as default language
        this.currentLang = 'en';
        localStorage.setItem('preferred_language', 'en');

        // Apply translations immediately
        this.updateContent();

        // Remove loading state
        document.body.classList.remove('i18n-loading');

        // Add language switcher event listeners
        const langSwitchers = document.querySelectorAll('.language-switcher');
        langSwitchers.forEach(switcher => {
            switcher.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        });
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            // Add loading state
            document.body.classList.add('i18n-loading');
            
            this.currentLang = lang;
            localStorage.setItem('preferred_language', lang);
            this.updateContent();
            
            // Remove loading state
            document.body.classList.remove('i18n-loading');
            
            // Update language switcher if it exists
            const langSwitcher = document.querySelector('.language-switcher');
            if (langSwitcher) {
                langSwitcher.value = lang;
            }
        }
    }

    updateContent() {
        console.log('Updating content for language:', this.currentLang);
        console.log('Available translations:', this.translations[this.currentLang]);

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn('Missing translation for key:', key, 'in language:', this.currentLang);
            }
        });

        // Update meta title
        const metaTitle = this.translations[this.currentLang].meta_title;
        if (metaTitle) {
            document.title = metaTitle;
        }

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    getTranslation(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Initialize i18n as early as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new I18n();
    });
} else {
    // If DOM is already loaded, initialize immediately
    window.i18n = new I18n();
} 