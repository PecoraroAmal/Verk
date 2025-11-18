// Verk - Works Management PWA
class VerkApp {
    constructor() {
        this.works = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.loadWorks();
        this.initEventListeners();
        this.renderWorks();
        this.registerServiceWorker();
    }

    // Initialize event listeners
    initEventListeners() {
        // Add work button
        document.getElementById('addWorkBtn').addEventListener('click', () => this.openModal());

        // Import/Export buttons
        document.getElementById('importBtn').addEventListener('click', () => this.openImportModal());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportWorks());

        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Form submit
        document.getElementById('workForm').addEventListener('submit', (e) => this.saveWork(e));

        // Cancel buttons
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModals());
        document.getElementById('importCancelBtn').addEventListener('click', () => this.closeModals());

        // Import confirm
        document.getElementById('importConfirmBtn').addEventListener('click', () => this.importWorks());

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterWorks(e.target.dataset.category));
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });
    }

    // Load works from localStorage
    loadWorks() {
        const stored = localStorage.getItem('verkWorks');
        if (stored) {
            this.works = JSON.parse(stored);
        } else {
            // Set default examples
            this.works = this.getDefaultWorks();
            this.saveToStorage();
        }
    }

    // Get default example works
    getDefaultWorks() {
        return [
            {
                id: this.generateId(),
                category: 'films',
                title: 'The Shawshank Redemption',
                creator: 'Frank Darabont',
                year: 1994,
                status: 'completed',
                rating: 10,
                notes: 'A timeless classic about hope and friendship.'
            },
            {
                id: this.generateId(),
                category: 'tv-series',
                title: 'Breaking Bad',
                creator: 'Vince Gilligan',
                year: 2008,
                status: 'completed',
                rating: 10,
                notes: 'Exceptional storytelling and character development.'
            },
            {
                id: this.generateId(),
                category: 'anime',
                title: 'Fullmetal Alchemist: Brotherhood',
                creator: 'Hiromu Arakawa',
                year: 2009,
                status: 'completed',
                rating: 9,
                notes: 'Perfect blend of action, philosophy, and emotion.'
            },
            {
                id: this.generateId(),
                category: 'books',
                title: '1984',
                creator: 'George Orwell',
                year: 1949,
                status: 'completed',
                rating: 9,
                notes: 'A dystopian masterpiece that remains relevant today.'
            },
            {
                id: this.generateId(),
                category: 'manga',
                title: 'One Piece',
                creator: 'Eiichiro Oda',
                year: 1997,
                status: 'in-progress',
                rating: 9,
                notes: 'Epic adventure with incredible world-building.'
            },
            {
                id: this.generateId(),
                category: 'cartoons',
                title: 'Avatar: The Last Airbender',
                creator: 'Michael Dante DiMartino, Bryan Konietzko',
                year: 2005,
                status: 'completed',
                rating: 10,
                notes: 'Brilliant storytelling suitable for all ages.'
            }
        ];
    }

    // Save works to localStorage
    saveToStorage() {
        localStorage.setItem('verkWorks', JSON.stringify(this.works));
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Render works list
    renderWorks() {
        const container = document.getElementById('worksList');
        const filteredWorks = this.currentFilter === 'all' 
            ? this.works 
            : this.works.filter(work => work.category === this.currentFilter);

        if (filteredWorks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No works found</h3>
                    <p>Start by adding a new work or importing your collection.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredWorks.map(work => `
            <div class="work-card">
                <div class="work-card-header">
                    <span class="work-category category-${work.category}">${this.formatCategory(work.category)}</span>
                </div>
                <div class="work-title">${this.escapeHtml(work.title)}</div>
                ${work.creator ? `<div class="work-meta">By ${this.escapeHtml(work.creator)}</div>` : ''}
                ${work.year ? `<div class="work-meta">Year: ${work.year}</div>` : ''}
                ${work.status ? `<span class="work-status">${this.formatStatus(work.status)}</span>` : ''}
                ${work.rating ? `<span class="work-rating">★ ${work.rating}/10</span>` : ''}
                ${work.notes ? `<div class="work-notes">${this.escapeHtml(work.notes)}</div>` : ''}
                <div class="work-actions">
                    <button class="btn btn-edit" onclick="app.editWork('${work.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="app.deleteWork('${work.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Format category for display
    formatCategory(category) {
        const formatted = category.replace('-', ' ');
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    // Format status for display
    formatStatus(status) {
        const statusMap = {
            'plan-to-watch': 'Plan to Watch/Read',
            'in-progress': 'In Progress',
            'completed': 'Completed',
            'on-hold': 'On Hold',
            'dropped': 'Dropped'
        };
        return statusMap[status] || status;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Filter works by category
    filterWorks(category) {
        this.currentFilter = category;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        this.renderWorks();
    }

    // Open modal for adding/editing work
    openModal(workId = null) {
        const modal = document.getElementById('workModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('workForm');

        this.editingId = workId;

        if (workId) {
            const work = this.works.find(w => w.id === workId);
            if (work) {
                modalTitle.textContent = 'Edit Work';
                document.getElementById('workCategory').value = work.category;
                document.getElementById('workTitle').value = work.title;
                document.getElementById('workCreator').value = work.creator || '';
                document.getElementById('workYear').value = work.year || '';
                document.getElementById('workStatus').value = work.status || 'plan-to-watch';
                document.getElementById('workRating').value = work.rating || '';
                document.getElementById('workNotes').value = work.notes || '';
            }
        } else {
            modalTitle.textContent = 'Add Work';
            form.reset();
        }

        modal.style.display = 'block';
    }

    // Close all modals
    closeModals() {
        document.getElementById('workModal').style.display = 'none';
        document.getElementById('importModal').style.display = 'none';
        this.editingId = null;
    }

    // Save work (add or edit)
    saveWork(e) {
        e.preventDefault();

        const workData = {
            category: document.getElementById('workCategory').value,
            title: document.getElementById('workTitle').value.trim(),
            creator: document.getElementById('workCreator').value.trim(),
            year: document.getElementById('workYear').value ? parseInt(document.getElementById('workYear').value) : null,
            status: document.getElementById('workStatus').value,
            rating: document.getElementById('workRating').value ? parseInt(document.getElementById('workRating').value) : null,
            notes: document.getElementById('workNotes').value.trim()
        };

        if (this.editingId) {
            // Edit existing work
            const index = this.works.findIndex(w => w.id === this.editingId);
            if (index !== -1) {
                this.works[index] = { ...this.works[index], ...workData };
            }
        } else {
            // Add new work
            workData.id = this.generateId();
            this.works.push(workData);
        }

        this.saveToStorage();
        this.renderWorks();
        this.closeModals();
    }

    // Edit work
    editWork(id) {
        this.openModal(id);
    }

    // Delete work
    deleteWork(id) {
        if (confirm('Are you sure you want to delete this work?')) {
            this.works = this.works.filter(w => w.id !== id);
            this.saveToStorage();
            this.renderWorks();
        }
    }

    // Open import modal
    openImportModal() {
        document.getElementById('importModal').style.display = 'block';
        document.getElementById('jsonInput').value = '';
    }

    // Import works from JSON
    importWorks() {
        const jsonInput = document.getElementById('jsonInput').value.trim();
        
        if (!jsonInput) {
            alert('Please paste JSON data to import.');
            return;
        }

        try {
            const imported = JSON.parse(jsonInput);
            
            if (!Array.isArray(imported)) {
                alert('Invalid JSON format. Please provide an array of works.');
                return;
            }

            // Validate and add IDs if missing
            const validWorks = imported.map(work => {
                if (!work.category || !work.title) {
                    throw new Error('Each work must have at least a category and title.');
                }
                return {
                    id: work.id || this.generateId(),
                    category: work.category,
                    title: work.title,
                    creator: work.creator || '',
                    year: work.year || null,
                    status: work.status || 'plan-to-watch',
                    rating: work.rating || null,
                    notes: work.notes || ''
                };
            });

            if (confirm(`Import ${validWorks.length} work(s)? This will add to your existing collection.`)) {
                this.works = [...this.works, ...validWorks];
                this.saveToStorage();
                this.renderWorks();
                this.closeModals();
                alert(`Successfully imported ${validWorks.length} work(s)!`);
            }
        } catch (error) {
            alert(`Error importing JSON: ${error.message}`);
        }
    }

    // Export works to JSON
    exportWorks() {
        if (this.works.length === 0) {
            alert('No works to export.');
            return;
        }

        const jsonString = JSON.stringify(this.works, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `verk-collection-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Register service worker for PWA
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
}

// Initialize app
const app = new VerkApp();
