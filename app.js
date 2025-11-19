// Data Management
class VerkApp {
    constructor() {
        this.items = [];
        this.currentEditId = null;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.renderItems();
        this.registerServiceWorker();
        // this.checkMobilePrompt(); // removed
    }

    // Service Worker Registration
    registerServiceWorker() {
        const isHttpContext = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        if ('serviceWorker' in navigator && isHttpContext) {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('Service Worker registered successfully:', reg);

                    // Listen for updates to the service worker
                    if (reg.waiting) {
                        console.log('Service worker waiting — new version available');
                    }

                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed') {
                                    if (navigator.serviceWorker.controller) {
                                        console.log('New service worker installed and waiting');
                                    } else {
                                        console.log('Service worker installed for the first time');
                                    }
                                }
                            });
                        }
                    });

                    // Reload the page when the new SW takes control
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        console.log('Service worker controller changed — reloading');
                        // Optional: you can show a message and then reload
                        window.location.reload();
                    });
                })
                .catch(err => {
                    console.error('Service Worker registration failed:', err);
                });
        } else {
            console.log('Service Worker not available in this context (protocol:', location.protocol, 'hostname:', location.hostname, ')');
        }
    }
    // Data Management
    loadData() {
        const savedData = localStorage.getItem('verkItems');
        if (savedData) {
            try {
                this.items = JSON.parse(savedData);
            } catch (e) {
                console.error('Error loading data:', e);
                this.items = this.getDefaultItems();
                this.saveData();
            }
        } else {
            this.items = this.getDefaultItems();
            // Persist defaults so they appear under Application > Local Storage
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('verkItems', JSON.stringify(this.items));
    }

    getDefaultItems() {
        return [
            {
                id: this.generateId(),
                category: 'films',
                name: 'The Shawshank Redemption',
                rating: 9.3,
                status: 'watched',
                firstDate: '2020-05-15',
                repeats: 3,
                comment: 'An absolute masterpiece about hope and friendship.',
                note: 'Netflix',
                colour: '#2ecc71',
                favorite: false
            },
            {
                id: this.generateId(),
                category: 'anime',
                name: 'Fullmetal Alchemist: Brotherhood',
                rating: 9.1,
                status: 'watched',
                firstDate: '2021-03-20',
                repeats: 2,
                comment: 'Perfect blend of action, philosophy, and emotional depth.',
                note: 'Crunchyroll',
                colour: '#e74c3c',
                favorite: true
            },
            {
                id: this.generateId(),
                category: 'books',
                name: 'To Kill a Mockingbird',
                rating: 8.8,
                status: 'read',
                firstDate: '2019-08-10',
                repeats: 1,
                comment: 'A powerful story about justice and morality.',
                note: 'Paperback',
                colour: '#9b59b6',
                favorite: false
            },
            {
                id: this.generateId(),
                category: 'tv-series',
                name: 'Breaking Bad',
                rating: 9.5,
                status: 'in-progress',
                firstDate: '2024-11-01',
                repeats: 0,
                comment: 'Currently on Season 3. Absolutely gripping!',
                note: 'Amazon Prime',
                colour: '#f39c12',
                favorite: false
            }
        ];
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Theme Management
    applyTheme() {
        const theme = localStorage.getItem('verkTheme') || 'light';
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }

        // Update active button
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setTheme(theme) {
        localStorage.setItem('verkTheme', theme);
        this.applyTheme();
    }

    // Event Listeners
    setupEventListeners() {
        // Header buttons
        document.getElementById('addItemBtn').addEventListener('click', () => this.openModal());
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
        document.getElementById('browseHeaderBtn').addEventListener('click', () => this.openPopularBrowser());

        // Modal buttons
        document.getElementById('closeModalBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('itemForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Settings
        document.getElementById('closeSettingsBtn').addEventListener('click', () => this.closeSettings());
        
        // Theme toggle buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.setTheme(theme);
            });
        });
        
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        document.getElementById('downloadSampleBtn').addEventListener('click', () => this.downloadSample());
        document.getElementById('clearCacheBtn').addEventListener('click', () => this.clearCache());
        const clearAllBtn = document.getElementById('clearAllDataBtn');
        if (clearAllBtn) clearAllBtn.addEventListener('click', () => this.clearAllData());

        // Optional: unified download button that prefers PWA install
        const unifiedDownloadBtn = document.getElementById('download-btn');
        if (unifiedDownloadBtn) {
            unifiedDownloadBtn.addEventListener('click', async (ev) => {
                if (this.deferredPrompt) {
                    ev.preventDefault();
                    try {
                        this.deferredPrompt.prompt();
                        const choice = await this.deferredPrompt.userChoice;
                        if (choice.outcome === 'accepted') {
                            await this.messageDialog('App installed successfully.', { title: 'Installed', okText: 'OK' });
                        } else {
                            await this.messageDialog('Install dismissed.', { title: 'Install', okText: 'OK' });
                        }
                    } catch (err) {
                        await this.messageDialog('Unable to start installation.', { title: 'Install Error', okText: 'OK' });
                    } finally {
                        this.deferredPrompt = null;
                        const btn = document.getElementById('installPWABtn');
                        if (btn) btn.style.display = 'none';
                        const btn2 = document.getElementById('installBtn');
                        if (btn2) btn2.style.display = 'none';
                        const msg = document.getElementById('installMessage');
                        if (msg) msg.style.display = 'block';
                    }
                } else {
                    // Fallback to JSON download
                    this.downloadJSON();
                }
            });
        }

        // Detail modal
        document.getElementById('closeDetailBtn').addEventListener('click', () => this.closeDetailModal());
        document.getElementById('editItemBtn').addEventListener('click', () => this.editCurrentItem());
        document.getElementById('deleteItemBtn').addEventListener('click', () => this.deleteCurrentItem());

        // Filters
        document.querySelectorAll('.category-icon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-icon-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.filterItems();
            });
        });
        document.getElementById('statusFilter').addEventListener('change', () => this.filterItems());
        document.getElementById('searchInput').addEventListener('input', () => this.filterItems());
        document.getElementById('favoritesFilterBtn').addEventListener('click', () => this.toggleFavoritesFilter());

        // Quick add modal
        document.getElementById('quickAddBtn').addEventListener('click', () => this.openQuickAddModal());
        document.getElementById('closeQuickAddBtn').addEventListener('click', () => this.closeQuickAddModal());
        document.getElementById('quickCancelBtn').addEventListener('click', () => this.closeQuickAddModal());
        document.getElementById('quickAddForm').addEventListener('submit', (e) => this.handleQuickAddSubmit(e));

        // Form category change
        document.getElementById('itemCategory').addEventListener('change', (e) => this.updateFormFields(e.target.value));

        // Colour picker sync
        document.getElementById('itemColour').addEventListener('input', (e) => {
            document.getElementById('itemColourText').value = e.target.value;
        });
        document.getElementById('itemColourText').addEventListener('input', (e) => {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                document.getElementById('itemColour').value = e.target.value;
            }
        });

        // PWA install - removed to avoid download prompts
        // window.addEventListener('beforeinstallprompt', (e) => {
        //     console.log('beforeinstallprompt event fired');
        //     // Do not prevent default to allow browser's native install prompt
        //     // e.preventDefault();
        //     // this.deferredPrompt = e;
        //     // document.getElementById('installPWABtn').style.display = 'flex';
        //     // document.getElementById('installBtn').style.display = 'inline-flex';
        //     // document.getElementById('installMessage').style.display = 'none';
        //     
        //     // If mobile prompt is showing, update it
        //     const mobilePrompt = document.getElementById('mobileInstallPrompt');
        //     if (mobilePrompt && mobilePrompt.style.display === 'block') {
        //         document.querySelector('.install-instructions').style.display = 'none';
        //         document.getElementById('installMobileBtn').style.display = 'inline-flex';
        //     }
        // });

        // PWA install buttons - removed
        // document.getElementById('installPWABtn').addEventListener('click', () => this.installPWA());
        // document.getElementById('installBtn').addEventListener('click', () => this.installPWA());

        // PWA installed - removed
        // window.addEventListener('appinstalled', (evt) => {
        //     console.log('PWA was installed', evt);
        //     // No deferredPrompt to clear since we don't prevent the prompt
        //     const pwaBtn = document.getElementById('installPWABtn');
        //     const installBtn = document.getElementById('installBtn');
        //     const installMsg = document.getElementById('installMessage');
        //     if (pwaBtn) pwaBtn.style.display = 'none';
        //     if (installBtn) installBtn.style.display = 'none';
        //     if (installMsg) installMsg.style.display = 'block';
        //     this.showNotification('App installed successfully!', 'success');
        // });

        // Mobile install prompt
        document.getElementById('closeMobilePrompt').addEventListener('click', () => this.closeMobilePrompt());
        document.getElementById('dismissPrompt').addEventListener('click', () => this.dismissMobilePrompt());
        document.getElementById('installMobileBtn').addEventListener('click', () => this.handleMobileInstall());

        // Popular browser
        document.getElementById('closePopularBtn').addEventListener('click', () => this.closePopularBrowser());
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchPopularTab(e.currentTarget.dataset.category));
        });
        document.getElementById('popularSearch').addEventListener('input', (e) => this.searchPopularItems(e.target.value));

        // System theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (localStorage.getItem('verkTheme') === 'auto') {
                this.applyTheme();
            }
        });
    }

    // Modal Management
    openModal(item = null) {
        const modal = document.getElementById('itemModal');
        const form = document.getElementById('itemForm');
        const modalTitle = document.getElementById('modalTitle');
        const submitBtnText = document.getElementById('submitBtnText');

        form.reset();
        this.currentEditId = null;

        if (item) {
            // Edit mode
            modalTitle.textContent = 'Edit Item';
            submitBtnText.textContent = 'Update Item';
            this.currentEditId = item.id;

            document.getElementById('itemId').value = item.id;
            document.getElementById('itemCategory').value = item.category;
            this.updateFormFields(item.category);
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemRating').value = item.rating || '';
            document.getElementById('itemStatus').value = item.status;
            document.getElementById('itemFirstDate').value = item.firstDate || '';
            document.getElementById('itemRepeats').value = item.repeats || 0;
            document.getElementById('itemComment').value = item.comment || '';
            document.getElementById('itemNote').value = item.note || '';
            document.getElementById('itemColour').value = item.colour || '#4a90e2';
            document.getElementById('itemColourText').value = item.colour || '#4a90e2';
        } else {
            // Add mode
            modalTitle.textContent = 'Add New Item';
            submitBtnText.textContent = 'Add Item';
            document.getElementById('itemColour').value = '#4a90e2';
            document.getElementById('itemColourText').value = '#4a90e2';
        }

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    closeModal() {
        document.getElementById('itemModal').style.display = 'none';
        this.currentEditId = null;
        document.body.classList.remove('modal-open');
    }

    updateFormFields(category) {
        const statusSelect = document.getElementById('itemStatus');
        const firstDateLabel = document.getElementById('firstDateLabel');
        const repeatsLabel = document.getElementById('repeatsLabel');

        const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(category);

        // Update status options
        statusSelect.innerHTML = '<option value="">Select status</option>';
        if (isMedia) {
            statusSelect.innerHTML += `
                <option value="watched">Watched</option>
                <option value="to-watch">To Watch</option>
                <option value="in-progress">In Progress</option>
            `;
            firstDateLabel.textContent = 'First Viewing';
            repeatsLabel.textContent = 'Rewatches Done';
        } else {
            statusSelect.innerHTML += `
                <option value="read">Read</option>
                <option value="to-read">To Read</option>
                <option value="in-progress">In Progress</option>
            `;
            firstDateLabel.textContent = 'First Reading';
            repeatsLabel.textContent = 'Re-readings';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formData = {
            id: this.currentEditId || this.generateId(),
            category: document.getElementById('itemCategory').value,
            name: document.getElementById('itemName').value.trim(),
            rating: parseFloat(document.getElementById('itemRating').value) || null,
            status: document.getElementById('itemStatus').value,
            firstDate: document.getElementById('itemFirstDate').value || null,
            repeats: parseInt(document.getElementById('itemRepeats').value) || 0,
            comment: document.getElementById('itemComment').value.trim() || null,
            note: document.getElementById('itemNote').value.trim() || null,
            colour: document.getElementById('itemColour').value,
            favorite: this.currentEditId ? (this.items.find(i => i.id === this.currentEditId)?.favorite || false) : false
        };

        if (this.currentEditId) {
            // Update existing item
            const index = this.items.findIndex(item => item.id === this.currentEditId);
            if (index !== -1) {
                this.items[index] = formData;
            }
        } else {
            // Add new item
            this.items.unshift(formData);
        }

        this.saveData();
        this.renderItems();
        this.closeModal();
    }

    // Quick Add Modal
    openQuickAddModal() {
        const modal = document.getElementById('quickAddModal');
        const form = document.getElementById('quickAddForm');
        form.reset();
        
        // Set default category based on current filter
        const activeCategoryBtn = document.querySelector('.category-icon-btn.active');
        let category = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'films';
        if (category === 'all') category = 'films';
        
        document.getElementById('quickItemCategory').value = category;
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        // Focus on name input
        setTimeout(() => document.getElementById('quickItemName').focus(), 100);
    }

    closeQuickAddModal() {
        document.getElementById('quickAddModal').style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    handleQuickAddSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('quickItemName').value.trim();
        const category = document.getElementById('quickItemCategory').value;
        
        if (!name) return;

        const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(category);
        const today = new Date().toISOString().split('T')[0];

        const newItem = {
            id: this.generateId(),
            category: category,
            name: name,
            rating: null,
            status: isMedia ? 'to-watch' : 'to-read',
            firstDate: today,
            repeats: 0,
            comment: null,
            note: null,
            colour: '#4a90e2',
            favorite: false
        };

        this.items.unshift(newItem);
        this.saveData();
        this.renderItems();
        this.closeQuickAddModal();
        this.showNotification(`"${name}" added to ${this.formatCategory(category)}!`, 'success');
    }

    // Settings
    openSettings() {
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('settingsPage').style.display = 'block';
        
        // Check if already installed
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        const installBtn = document.getElementById('installBtn');
        const installMsg = document.getElementById('installMessage');
        
        if (isInstalled) {
            installBtn.style.display = 'none';
            installMsg.style.display = 'block';
        } else {
            installBtn.style.display = 'inline-flex';
            installMsg.style.display = 'none';
        }
    }

    closeSettings() {
        document.getElementById('settingsPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }

    // Data Import/Export
    downloadBlob(filename, dataStr) {
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportData() {
        const dataStr = JSON.stringify(this.items, null, 2);
        const filename = `verk-backup-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadBlob(filename, dataStr);
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                if (Array.isArray(importedData)) {
                    this.items = importedData;
                    this.saveData();
                    this.renderItems();
                    this.showNotification('Data imported successfully!', 'success');
                } else {
                    this.showNotification('Invalid JSON format. Expected an array of items.', 'error');
                }
            } catch (error) {
                this.showNotification('Error importing data. Please check the file format.', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    downloadSample() {
        const dataStr = JSON.stringify(sampleData, null, 2);
        this.downloadBlob('verk-sample-data.json', dataStr);
        this.showNotification('Sample data downloaded!', 'success');
    }

    downloadJSON() {
        this.exportData();
    }

    async clearCache() {
        const isHttpContext = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        if (!isHttpContext) {
            this.showNotification('Cache management requires running over http(s). Use a local server.', 'error');
            console.warn('Clear cache skipped: unsupported protocol', location.protocol);
            return;
        }
        try {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(reg => reg.unregister()));
            }
            this.showNotification('Browser cache cleared! Your data is safe in localStorage. Reload to re-register service worker.', 'success');
        } catch (error) {
            this.showNotification('Error clearing cache', 'error');
            console.error('Clear cache error:', error);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notificationMessage');
        notification.textContent = message;
        notification.className = 'notification-message ' + type;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // PWA Install
    async installPWA() {
        console.log('Install PWA requested...');
        console.log('Browser:', navigator.userAgent);
        console.log('Protocol:', location.protocol);
        console.log('Deferred prompt available:', !!this.deferredPrompt);
        
        // Check if we're in a valid installation context
        const isHttpContext = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        if (!isHttpContext) {
            console.log('Cannot install PWA from file:// protocol');
            this.showNotification('PWA installation requires running over HTTP/HTTPS. Use a local server.', 'error');
            return;
        }
        
        // Check browser compatibility
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        const isEdge = /Edg/.test(navigator.userAgent);
        const isOpera = /OPR/.test(navigator.userAgent);
        const isSamsung = /SamsungBrowser/.test(navigator.userAgent);
        const isBrave = /Brave/.test(navigator.userAgent);
        
        console.log('Browser detection:', { isChrome, isEdge, isOpera, isSamsung, isBrave });
        
        if (isBrave) {
            console.log('Brave browser detected - PWA support may be limited');
            this.showNotification('Brave detected. Enable PWA support: brave://flags/#enable-desktop-pwas → Enable → Restart browser.', 'warning');
            return;
        } else if (!isChrome && !isEdge && !isOpera && !isSamsung) {
            console.log('Browser may not support PWA installation');
            this.showNotification('PWA installation works best in Chrome, Edge, or Opera. Try a different browser.', 'warning');
            return;
        }
        
        // Check if already installed
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator.standalone === true) ||
                          document.referrer.includes('android-app://');
        
        if (isInstalled) {
            console.log('App appears to be already installed');
            this.showNotification('App appears to be already installed. Check your home screen or app drawer.', 'info');
            return;
        }
        
        // For browsers that support beforeinstallprompt, the prompt should appear automatically
        // For others, provide instructions
        if ('standalone' in window.navigator && window.navigator.standalone === false) {
            // iOS Safari
            this.showNotification('On iOS Safari: tap Share → Add to Home Screen', 'info');
            return;
        }
        
        // If we have deferred prompt (from beforeinstallprompt), use it
        if (this.deferredPrompt) {
            try {
                this.deferredPrompt.prompt();
                const { outcome } = await this.deferredPrompt.userChoice;
                console.log('Install outcome:', outcome);
                
                if (outcome === 'accepted') {
                    console.log('PWA installed successfully');
                    this.showNotification('App installed successfully!', 'success');
                } else {
                    console.log('PWA install dismissed');
                    this.showNotification('Install cancelled.', 'info');
                }
            } catch (error) {
                console.error('PWA install error:', error);
                this.showNotification('Installation failed. Please try again.', 'error');
            }
            
            this.deferredPrompt = null;
        } else {
            // No deferred prompt, browser should show its own prompt
            this.showNotification('Installation prompt should appear from your browser. If not, try refreshing the page or using Chrome/Edge.', 'info');
        }
        
        // Hide install buttons
        document.getElementById('installPWABtn').style.display = 'none';
        document.getElementById('installBtn').style.display = 'none';
        document.getElementById('installMessage').style.display = 'block';
    }

    // Confirm dialog (non-blocking)
    confirmDialog(message, options = {}) {
        const title = options.title || 'Confirm';
        const confirmText = options.confirmText || 'OK';
        const cancelText = options.cancelText || 'Cancel';

        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const msgEl = document.getElementById('confirmMessage');
        const okBtn = document.getElementById('confirmOkBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');
        const closeBtn = document.getElementById('closeConfirmBtn');

        titleEl.textContent = title;
        msgEl.textContent = message;
        okBtn.innerHTML = options.confirmHtml || `<i class="fas fa-check"></i> ${this.escapeHtml(confirmText)}`;
        cancelBtn.textContent = cancelText;

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');

        return new Promise((resolve) => {
            const cleanup = () => {
                okBtn.removeEventListener('click', onOk);
                cancelBtn.removeEventListener('click', onCancel);
                closeBtn.removeEventListener('click', onCancel);
                document.body.classList.remove('modal-open');
                modal.style.display = 'none';
            };
            const onOk = () => { cleanup(); resolve(true); };
            const onCancel = () => { cleanup(); resolve(false); };
            okBtn.addEventListener('click', onOk, { once: true });
            cancelBtn.addEventListener('click', onCancel, { once: true });
            closeBtn.addEventListener('click', onCancel, { once: true });
        });
    }

    // Message dialog (non-blocking)
    messageDialog(message, options = {}) {
        const title = options.title || 'Message';
        const okText = options.okText || 'OK';

        const modal = document.getElementById('messageModal');
        const titleEl = document.getElementById('messageTitle');
        const msgEl = document.getElementById('messageText');
        const okBtn = document.getElementById('messageOkBtn');
        const closeBtn = document.getElementById('closeMessageBtn');

        titleEl.textContent = title;
        msgEl.textContent = message;
        okBtn.textContent = okText;

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');

        return new Promise((resolve) => {
            const cleanup = () => {
                okBtn.removeEventListener('click', onOk);
                closeBtn.removeEventListener('click', onOk);
                document.body.classList.remove('modal-open');
                modal.style.display = 'none';
            };
            const onOk = () => { cleanup(); resolve(true); };
            okBtn.addEventListener('click', onOk, { once: true });
            closeBtn.addEventListener('click', onOk, { once: true });
        });
    }

    // Render Items
    renderItems() {
        this.filterItems();
    }

    toggleFavoritesFilter() {
        const btn = document.getElementById('favoritesFilterBtn');
        const isActive = btn.classList.toggle('active');
        
        if (isActive) {
            btn.querySelector('i').className = 'fas fa-heart';
        } else {
            btn.querySelector('i').className = 'far fa-heart';
        }
        
        this.filterItems();
    }

    toggleFavorite(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.favorite = !item.favorite;
            this.saveData();
            this.renderItems();
        }
    }

    filterItems() {
        const activeCategoryBtn = document.querySelector('.category-icon-btn.active');
        const categoryFilter = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'all';
        const statusFilter = document.getElementById('statusFilter').value;
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const favoritesOnly = document.getElementById('favoritesFilterBtn').classList.contains('active');

        let filtered = this.items.filter(item => {
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery);
            const matchesFavorite = !favoritesOnly || item.favorite;
            return matchesCategory && matchesStatus && matchesSearch && matchesFavorite;
        });

        this.displayItems(filtered);
    }

    displayItems(items) {
        const grid = document.getElementById('itemsGrid');
        const emptyState = document.getElementById('emptyState');

        if (items.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        grid.innerHTML = items.map(item => this.createItemCard(item)).join('');

        // Add click listeners
        grid.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open detail if clicking favorite button
                if (e.target.closest('.favorite-btn')) return;
                
                const itemId = card.dataset.id;
                const item = this.items.find(i => i.id === itemId);
                if (item) this.openDetailModal(item);
            });
        });

        // Add favorite button listeners
        grid.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.dataset.id;
                this.toggleFavorite(itemId);
            });
        });
    }

    createItemCard(item) {
        const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(item.category);
        const firstDateLabel = isMedia ? 'First Viewing' : 'First Reading';
        const repeatsLabel = isMedia ? 'Rewatches' : 'Re-readings';

        return `
            <div class="item-card" data-id="${item.id}" style="border-left-color: ${item.colour}; --card-colour: ${item.colour}">
                <div class="item-card-header">
                    <div style="flex: 1; min-width: 0;">
                        <div class="item-name">${this.escapeHtml(item.name)}</div>
                        <span class="category-badge" style="background-color: ${item.colour}22; color: ${item.colour}">
                            <i class="fas ${this.getCategoryIcon(item.category)}"></i>
                        </span>
                    </div>
                    ${item.rating ? `<div class="item-rating">★ ${item.rating}</div>` : ''}
                </div>
                <div class="item-info">
                    <div class="item-badge">
                        <span class="badge-label">Status:</span>
                        <span class="status-badge" style="background-color: ${this.getStatusColour(item.status)}22; color: ${this.getStatusColour(item.status)}">
                            ${this.formatStatus(item.status)}
                        </span>
                    </div>
                    ${item.firstDate ? `
                        <div class="item-badge">
                            <span class="badge-label">${firstDateLabel}:</span>
                            ${this.formatDate(item.firstDate)}
                        </div>
                    ` : ''}
                    <div class="item-badge">
                        <span class="badge-label">${repeatsLabel}:</span>
                        ${item.repeats || 0}
                    </div>
                </div>
                <button class="favorite-btn ${item.favorite ? 'active' : ''}" data-id="${item.id}">
                    <i class="fa${item.favorite ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
        `;
    }

    // Detail Modal
    openDetailModal(item) {
        const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(item.category);
        
        document.getElementById('detailName').textContent = item.name;
        document.getElementById('detailCategory').textContent = this.formatCategory(item.category);
        document.getElementById('detailRating').textContent = item.rating ? `★ ${item.rating}` : 'Not rated';
        document.getElementById('detailStatus').textContent = this.formatStatus(item.status);
        
        document.getElementById('detailFirstDateLabel').textContent = isMedia ? 'First Viewing:' : 'First Reading:';
        document.getElementById('detailFirstDate').textContent = item.firstDate ? this.formatDate(item.firstDate) : 'Not set';
        
        document.getElementById('detailRepeatsLabel').textContent = isMedia ? 'Rewatches Done:' : 'Re-readings:';
        document.getElementById('detailRepeats').textContent = item.repeats || 0;
        
        if (item.comment) {
            document.getElementById('detailCommentRow').style.display = 'flex';
            document.getElementById('detailComment').textContent = item.comment;
        } else {
            document.getElementById('detailCommentRow').style.display = 'none';
        }
        
        if (item.note) {
            document.getElementById('detailNoteRow').style.display = 'flex';
            document.getElementById('detailNote').textContent = item.note;
        } else {
            document.getElementById('detailNoteRow').style.display = 'none';
        }
        
        document.getElementById('detailModal').dataset.itemId = item.id;
        document.getElementById('detailModal').style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    closeDetailModal() {
        document.getElementById('detailModal').style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    async deleteCurrentItem() {
        const itemId = document.getElementById('detailModal').dataset.itemId;
        const item = this.items.find(i => i.id === itemId);
        const name = item ? item.name : 'this item';
        const ok = await this.confirmDialog(`Delete "${name}"? This action cannot be undone.`, {
            title: 'Confirm Delete',
            confirmHtml: '<i class="fas fa-trash"></i> Delete',
            confirmText: 'Delete',
            cancelText: 'Cancel'
        });
        if (!ok) return;

        this.items = this.items.filter(i => i.id !== itemId);
        this.saveData();
        this.renderItems();
        this.closeDetailModal();
        this.showNotification('Item deleted successfully', 'success');
    }

    // Clear All Data (localStorage)
    async clearAllData() {
        const ok = await this.confirmDialog('This will delete ALL your data. This cannot be undone. Continue?', {
            title: 'Clear All Data',
            confirmHtml: '<i class="fas fa-trash"></i> Delete',
            confirmText: 'Delete',
            cancelText: 'Cancel'
        });
        if (!ok) return;

        try {
            // Prefer clearing the entire origin storage for this app
            try { localStorage.removeItem('verkItems'); } catch {}
            try { localStorage.removeItem('verkTheme'); } catch {}
            try { localStorage.removeItem('verkMobilePromptDismissed'); } catch {}
            // As a stronger fallback, clear all localStorage for this origin
            try { localStorage.clear(); } catch {}
        } catch (e) {
            console.warn('localStorage clear error:', e);
        }

        this.items = [];
        this.renderItems();
        await this.messageDialog('All data has been cleared', { title: 'Cleared', okText: 'OK' });
        location.reload();
    }

    // Mobile Install Prompt
    checkMobilePrompt() {
        // Check if on mobile and not installed
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        const hasPromptedBefore = localStorage.getItem('verkMobilePromptDismissed');
        
        if (isMobile && !isStandalone && !hasPromptedBefore && !this.deferredPrompt) {
            // Show after 3 seconds
            setTimeout(() => {
                const prompt = document.getElementById('mobileInstallPrompt');
                if (prompt && !this.deferredPrompt) {
                    // For iOS devices, show instructions instead
                    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                    if (isIOS) {
                        document.querySelector('.install-instructions').style.display = 'block';
                        document.getElementById('installMobileBtn').style.display = 'none';
                    }
                    prompt.style.display = 'block';
                    document.body.classList.add('modal-open');
                }
            }, 3000);
        }
    }

    closeMobilePrompt() {
        document.getElementById('mobileInstallPrompt').style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    dismissMobilePrompt() {
        localStorage.setItem('verkMobilePromptDismissed', 'true');
        this.closeMobilePrompt();
    }

    handleMobileInstall() {
        if (this.deferredPrompt) {
            this.installPWA();
            this.closeMobilePrompt();
        }
    }

    // Popular Items Browser
    openPopularBrowser() {
        document.getElementById('popularBrowser').style.display = 'flex';
        document.body.classList.add('modal-open');
        document.getElementById('popularSearch').value = '';
        this.switchPopularTab('films');
    }

    closePopularBrowser() {
        document.getElementById('popularBrowser').style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    switchPopularTab(category) {
        this.currentPopularCategory = category;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Get popular items for category
        let popularItems = [];
        switch(category) {
            case 'films': popularItems = typeof popularFilms !== 'undefined' ? popularFilms : []; break;
            case 'tv-series': popularItems = typeof popularTVSeries !== 'undefined' ? popularTVSeries : []; break;
            case 'anime': popularItems = typeof popularAnime !== 'undefined' ? popularAnime : []; break;
            case 'cartoons': popularItems = typeof popularCartoons !== 'undefined' ? popularCartoons : []; break;
            case 'books': popularItems = typeof popularBooks !== 'undefined' ? popularBooks : []; break;
            case 'manga': popularItems = typeof popularManga !== 'undefined' ? popularManga : []; break;
        }

        this.currentPopularItems = popularItems;
        document.getElementById('popularSearch').value = '';
        this.renderPopularItems(popularItems);
    }

    searchPopularItems(query) {
        if (!this.currentPopularItems) return;
        
        const filtered = this.currentPopularItems.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.note && item.note.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.renderPopularItems(filtered);
    }

    renderPopularItems(items) {
        const list = document.getElementById('popularList');
        
        if (items.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No items found</p>';
            return;
        }

        // Group items by saga/note
        const sagas = {};
        const standalone = [];
        
        items.forEach((item, index) => {
            const originalIndex = this.currentPopularItems.indexOf(item);
            const itemWithIndex = { ...item, originalIndex };
            
            if (item.note && (item.note.includes('saga') || item.note.includes('trilogy') || item.note.includes('series') || item.note.includes('MCU') || item.note.includes('Wizarding World'))) {
                const sagaName = item.note;
                if (!sagas[sagaName]) {
                    sagas[sagaName] = [];
                }
                sagas[sagaName].push(itemWithIndex);
            } else {
                standalone.push(itemWithIndex);
            }
        });

        let html = '';

        // Render sagas
        Object.entries(sagas).forEach(([sagaName, sagaItems]) => {
            if (sagaItems.length > 1) {
                const allAdded = sagaItems.every(item => 
                    this.items.some(i => i.name === item.name && i.category === item.category)
                );
                
                html += `
                    <div class="saga-group">
                        <div class="saga-header" data-saga="${this.escapeHtml(sagaName)}">
                            <div class="saga-header-left">
                                <i class="fas fa-chevron-down saga-toggle"></i>
                                <div>
                                    <div class="saga-title">${this.escapeHtml(sagaName)}</div>
                                    <div class="saga-count">${sagaItems.length} items</div>
                                </div>
                            </div>
                            <button class="add-saga-btn ${allAdded ? 'added' : ''}" 
                                    data-saga="${this.escapeHtml(sagaName)}"
                                    ${allAdded ? 'disabled' : ''}>
                                <i class="fas ${allAdded ? 'fa-check' : 'fa-plus'}"></i>
                                ${allAdded ? 'All Added' : 'Add All'}
                            </button>
                        </div>
                        <div class="saga-items">
                            ${sagaItems.map(item => this.renderPopularItem(item)).join('')}
                        </div>
                    </div>
                `;
            } else {
                standalone.push(...sagaItems);
            }
        });

        // Render standalone items
        html += standalone.map(item => this.renderPopularItem(item)).join('');

        list.innerHTML = html;

        // Add event listeners
        list.querySelectorAll('.add-popular-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.addPopularItem(this.currentPopularItems[index], e.currentTarget);
            });
        });

        list.querySelectorAll('.add-saga-btn:not(.added)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const sagaName = e.currentTarget.dataset.saga;
                this.addSaga(sagaName, e.currentTarget);
            });
        });

        // Saga toggle functionality
        list.querySelectorAll('.saga-header').forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't toggle if clicking the add button
                if (e.target.closest('.add-saga-btn')) return;
                
                const sagaGroup = header.closest('.saga-group');
                sagaGroup.classList.toggle('collapsed');
            });
        });
    }

    renderPopularItem(item) {
        const existingItem = this.items.find(i => i.name === item.name && i.category === item.category);
        const alreadyAdded = !!existingItem;
        
        return `
            <div class="popular-item">
                <div class="popular-item-info">
                    <div class="popular-item-name">${this.escapeHtml(item.name)}</div>
                    <div class="popular-item-details">
                        ${item.rating ? `
                            <span class="popular-item-rating">
                                <i class="fas fa-star"></i> ${item.rating}
                            </span>
                        ` : ''}
                        ${item.note ? `<span class="popular-item-note">${this.escapeHtml(item.note)}</span>` : ''}
                    </div>
                </div>
                <button class="add-popular-btn ${alreadyAdded ? 'added' : ''}" 
                        data-index="${item.originalIndex}"
                        data-item-id="${existingItem ? existingItem.id : ''}">
                    <i class="fas ${alreadyAdded ? 'fa-heart' : 'fa-plus'}"></i>
                </button>
            </div>
        `;
    }

    addPopularItem(item, button) {
        const itemId = button.dataset.itemId;
        
        // If already added, remove it
        if (itemId) {
            this.items = this.items.filter(i => i.id !== itemId);
            this.saveData();
            this.renderItems();
            this.renderPopularItems(this.currentPopularItems);
            return;
        }
        
        // Otherwise, add it
        const today = new Date().toISOString().split('T')[0];
        const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(item.category);
        
        const newItem = {
            id: this.generateId(),
            category: item.category,
            name: item.name,
            rating: item.rating || null,
            status: isMedia ? 'watched' : 'read',
            firstDate: today,
            repeats: 0,
            comment: item.note || null,
            note: null,
            colour: item.colour || '#4a90e2',
            favorite: false
        };

        this.items.unshift(newItem);
        this.saveData();
        this.renderItems();
        this.renderPopularItems(this.currentPopularItems);
    }

    addSaga(sagaName, button) {
        const sagaItems = this.currentPopularItems.filter(item => item.note === sagaName);
        const today = new Date().toISOString().split('T')[0];
        
        sagaItems.forEach(item => {
            const alreadyExists = this.items.some(i => i.name === item.name && i.category === item.category);
            if (!alreadyExists) {
                const isMedia = ['films', 'tv-series', 'anime', 'cartoons'].includes(item.category);
                
                const newItem = {
                    id: this.generateId(),
                    category: item.category,
                    name: item.name,
                    rating: item.rating || null,
                    status: isMedia ? 'watched' : 'read',
                    firstDate: today,
                    repeats: 0,
                    comment: item.note || null,
                    note: null,
                    colour: item.colour || '#4a90e2',
                    favorite: false
                };
                
                this.items.unshift(newItem);
            }
        });
        
        this.saveData();
        this.renderItems();
        this.renderPopularItems(this.currentPopularItems);
    }

    // Utility Functions
    getCategoryIcon(category) {
        const map = {
            'films': 'fa-film',
            'tv-series': 'fa-tv',
            'anime': 'fa-dragon',
            'cartoons': 'fa-brands fa-bilibili',
            'books': 'fa-book',
            'manga': 'fa-book-open'
        };
        return map[category] || 'fa-circle';
    }

    formatCategory(category) {
        const map = {
            'films': 'Film',
            'tv-series': 'TV Series',
            'anime': 'Anime',
            'cartoons': 'Cartoon',
            'books': 'Book',
            'manga': 'Manga'
        };
        return map[category] || category;
    }

    formatStatus(status) {
        const map = {
            'watched': 'Watched',
            'to-watch': 'To Watch',
            'read': 'Read',
            'to-read': 'To Read',
            'in-progress': 'In Progress'
        };
        return map[status] || status;
    }

    getStatusColour(status) {
        const map = {
            'watched': '#2ecc71',
            'read': '#2ecc71',
            'in-progress': '#f39c12',
            'to-watch': '#3498db',
            'to-read': '#3498db'
        };
        return map[status] || '#95a5a6';
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
const app = new VerkApp();
