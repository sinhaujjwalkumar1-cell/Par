// Main Application Module
const ServiceApp = (function() {
    // Private variables
    let currentTheme = 'light';
    let searchTimeout = null;
    
    // DOM Elements
    const elements = {
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        themeToggleBtnSmall: document.getElementById('themeToggleBtnSmall'),
        searchInput: document.getElementById('searchInput'),
        searchClearBtn: document.getElementById('searchClearBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        mainContent: document.getElementById('mainContent')
    };

    // Initialize the application
    function init() {
        loadUserPreferences();
        setupEventListeners();
        initializeColorSystem();
        setupSearchFunctionality();
        showNotification('App loaded successfully!', 'success');
    }

    // Load user preferences from localStorage
    function loadUserPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        // Load color preferences
        ColorSystem.loadColorsFromLocalStorage();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Theme toggle
        if (elements.themeToggleBtn) {
            elements.themeToggleBtn.addEventListener('click', toggleTheme);
        }
        if (elements.themeToggleBtnSmall) {
            elements.themeToggleBtnSmall.addEventListener('click', toggleTheme);
        }

        // Search functionality
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', handleSearch);
        }
        if (elements.searchClearBtn) {
            elements.searchClearBtn.addEventListener('click', clearSearch);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }

    // Theme management
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
    }

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle button
        const icon = elements.themeToggleBtn?.querySelector('i');
        const text = elements.themeToggleBtn?.querySelector('span');
        const smallIcon = elements.themeToggleBtnSmall?.querySelector('i');
        
        if (theme === 'dark') {
            if (icon) icon.className = 'fas fa-sun';
            if (text) text.textContent = 'Light Mode';
            if (smallIcon) smallIcon.className = 'fas fa-sun';
        } else {
            if (icon) icon.className = 'fas fa-moon';
            if (text) text.textContent = 'Dark Mode';
            if (smallIcon) smallIcon.className = 'fas fa-moon';
        }
        
        // Save preference
        localStorage.setItem('appTheme', theme);
        showNotification(`${theme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'success');
    }

    // Search functionality
    function setupSearchFunctionality() {
        if (!elements.searchInput) return;
        
        elements.searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 4px 12px var(--shadow-hover)';
            this.parentElement.style.borderColor = 'var(--primary-color)';
        });
        
        elements.searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '0 2px 8px var(--shadow-color)';
            this.parentElement.style.borderColor = 'var(--border-input)';
        });
    }

    function handleSearch(event) {
        const query = event.target.value.trim();
        
        // Show/hide clear button
        if (elements.searchClearBtn) {
            elements.searchClearBtn.style.display = query ? 'flex' : 'none';
        }
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Debounce search
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    }

    function performSearch(query) {
        if (!query) {
            resetSearch();
            return;
        }
        
        showLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            const results = searchServices(query);
            displaySearchResults(results, query);
            showLoading(false);
        }, 500);
    }

    function searchServices(query) {
        const results = {
            services: [],
            providers: [],
            categories: []
        };
        
        // Search in services
        document.querySelectorAll('.service-item').forEach(item => {
            const title = item.querySelector('.service-title').textContent;
            const desc = item.querySelector('.service-desc').textContent;
            
            if (title.toLowerCase().includes(query.toLowerCase()) || 
                desc.toLowerCase().includes(query.toLowerCase())) {
                results.services.push({
                    element: item,
                    title: title,
                    description: desc
                });
            }
        });
        
        // Search in providers
        document.querySelectorAll('.provider-card').forEach(card => {
            const title = card.querySelector('.service-title-provider').textContent;
            const name = card.querySelector('.provider-name').textContent;
            
            if (title.toLowerCase().includes(query.toLowerCase()) || 
                name.toLowerCase().includes(query.toLowerCase())) {
                results.providers.push({
                    element: card,
                    title: title,
                    name: name
                });
            }
        });
        
        return results;
    }

    function displaySearchResults(results, query) {
        // Hide all elements first
        document.querySelectorAll('.service-item, .provider-card, .category-section, .services-near-you')
            .forEach(el => el.style.display = 'none');
        
        // Show matching results
        results.services.forEach(result => {
            result.element.style.display = 'block';
            highlightText(result.element, query);
        });
        
        results.providers.forEach(result => {
            result.element.style.display = 'block';
            highlightText(result.element, query);
        });
        
        // Show message if no results
        if (results.services.length === 0 && results.providers.length === 0) {
            showNotification(`No results found for "${query}"`, 'warning');
        } else {
            showNotification(`Found ${results.services.length + results.providers.length} results for "${query}"`, 'success');
        }
    }

    function highlightText(element, query) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const text = node.nodeValue;
            const regex = new RegExp(query, 'gi');
            const newText = text.replace(regex, match => 
                `<mark style="background: var(--primary-color); color: white; padding: 2px 4px; border-radius: 4px;">${match}</mark>`
            );
            
            if (newText !== text) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                node.parentNode.replaceChild(span, node);
            }
        }
    }

    function resetSearch() {
        document.querySelectorAll('.service-item, .provider-card, .category-section, .services-near-you')
            .forEach(el => el.style.display = 'block');
        
        // Remove highlights
        document.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(mark.textContent);
        });
    }

    function clearSearch() {
        if (elements.searchInput) {
            elements.searchInput.value = '';
            elements.searchClearBtn.style.display = 'none';
            resetSearch();
        }
    }

    // Loading states
    function showLoading(show) {
        if (elements.loadingSpinner) {
            elements.loadingSpinner.style.display = show ? 'block' : 'none';
        }
        if (elements.mainContent) {
            elements.mainContent.style.opacity = show ? '0.5' : '1';
        }
    }

    // Keyboard shortcuts
    function handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            if (elements.searchInput) {
                elements.searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (event.key === 'Escape') {
            if (elements.searchInput && document.activeElement === elements.searchInput) {
                clearSearch();
                elements.searchInput.blur();
            }
        }
        
        // Ctrl/Cmd + / for theme toggle
        if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            toggleTheme();
        }
    }

    // Public API
    return {
        init: init,
        toggleTheme: toggleTheme,
        performSearch: performSearch
    };
})();

// Enhanced Notification System
const NotificationSystem = {
    show: function(message, type = 'success', duration = 3000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 12px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    z-index: 1000;
                    box-shadow: 0 4px 12px var(--shadow-color);
                    animation: slideInRight 0.3s ease;
                    max-width: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }
                .notification.success { background: var(--primary-color); color: white; }
                .notification.error { background: var(--btn-reset-bg); color: white; }
                .notification.warning { background: #F59E0B; color: white; }
                .notification-content { display: flex; align-items: center; gap: 8px; flex: 1; }
                .notification-close { background: transparent; border: none; color: inherit; cursor: pointer; }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
    },
    
    getIcon: function(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
};

// Enhanced Color System with Basic/Advanced Mode
const ColorSystem = (function() {
    let isAdvancedMode = false;
    
    function init() {
        setupColorModeToggle();
        // ... [rest of your existing color system initialization]
    }
    
    function setupColorModeToggle() {
        const modeToggleHTML = `
            <div class="color-mode-toggle">
                <button class="color-mode-btn active" data-mode="basic">Basic</button>
                <button class="color-mode-btn" data-mode="advanced">Advanced</button>
            </div>
        `;
        
        const colorControls = document.querySelector('.color-controls-container');
        if (colorControls) {
            colorControls.insertAdjacentHTML('beforebegin', modeToggleHTML);
            
            // Add event listeners
            document.querySelectorAll('.color-mode-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const mode = this.dataset.mode;
                    setColorMode(mode);
                });
            });
        }
    }
    
    function setColorMode(mode) {
        isAdvancedMode = mode === 'advanced';
        
        // Update buttons
        document.querySelectorAll('.color-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Show/hide advanced controls
        document.querySelectorAll('.advanced-controls').forEach(control => {
            control.classList.toggle('active', isAdvancedMode);
        });
        
        // Show/hide HSV controls based on mode
        document.querySelectorAll('.hsv-controls').forEach(control => {
            control.style.display = isAdvancedMode ? 'block' : 'none';
        });
    }
    
    // ... [rest of your existing color system functions]
    
    return {
        init: init,
        // ... [other public methods]
    };
})();

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ServiceApp.init();
    ColorSystem.init();
    
    // Add CSS for new features
    const additionalStyles = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        mark {
            background: var(--primary-color);
            color: white;
            padding: 2px 4px;
            border-radius: 4px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

// Utility function for notifications
function showNotification(message, type = 'success') {
    NotificationSystem.show(message, type);
}
