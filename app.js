// Verk - Works Manager App
// All data stored in localStorage, works entirely in the browser

const STORAGE_KEY = 'verk-works';
let works = [];
let currentEditId = null;
let currentFilter = 'all';

// Category configurations
const CATEGORIES = {
    'films': { label: 'Films', type: 'viewing' },
    'tv-series': { label: 'TV Series', type: 'viewing' },
    'anime': { label: 'Anime', type: 'viewing' },
    'cartoons': { label: 'Cartoons', type: 'viewing' },
    'books': { label: 'Books', type: 'reading' },
    'manga': { label: 'Manga', type: 'reading' }
};

const STATUS_OPTIONS = {
    'viewing': ['watched', 'to watch', 'in progress'],
    'reading': ['read', 'to read', 'in progress']
};

// Default example data
const DEFAULT_WORKS = [
    {
        id: generateId(),
        category: 'films',
        name: 'Inception',
        rating: 8.8,
        status: 'watched',
        firstDate: '2010-07-16',
        rewatches: 3,
        comment: 'Mind-bending thriller about dreams within dreams.',
        note: 'Netflix',
        colour: '#1a472a'
    },
    {
        id: generateId(),
        category: 'books',
        name: 'Pride and Prejudice',
        rating: 9.0,
        status: 'read',
        firstDate: '2020-03-15',
        rewatches: 2,
        comment: 'Classic romance novel by Jane Austen.',
        note: 'Physical copy',
        colour: '#6b4423'
    },
    {
        id: generateId(),
        category: 'anime',
        name: 'Attack on Titan',
        rating: 9.5,
        status: 'in progress',
        firstDate: '2023-01-10',
        rewatches: 0,
        comment: 'Epic story about humanity\'s fight for survival.',
        note: 'Crunchyroll',
        colour: '#8b0000'
    }
];

// Utility function to generate unique IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize the app
function init() {
    loadWorks();
    setupEventListeners();
    renderWorks();
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(error => console.log('Service Worker registration failed:', error));
    }
}

// Load works from localStorage
function loadWorks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        works = JSON.parse(stored);
    } else {
        // Initialize with default examples
        works = DEFAULT_WORKS;
        saveWorks();
    }
}

// Save works to localStorage
function saveWorks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

// Setup all event listeners
function setupEventListeners() {
    // Add button
    document.getElementById('addBtn').addEventListener('click', openAddModal);
    
    // Import/Export
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);
    
    // Filter
    document.getElementById('filterCategory').addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderWorks();
    });
    
    // Modal controls
    const modal = document.getElementById('modal');
    const detailModal = document.getElementById('detailModal');
    
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.querySelector('.cancel-btn').addEventListener('click', closeModal);
    document.querySelectorAll('.close-detail-btn').forEach(btn => {
        btn.addEventListener('click', closeDetailModal);
    });
    
    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) closeDetailModal();
    });
    
    // Form submission
    document.getElementById('workForm').addEventListener('submit', handleFormSubmit);
    
    // Category change updates status options and labels
    document.getElementById('category').addEventListener('change', updateFormFields);
    
    // Detail modal actions
    document.getElementById('editFromDetailBtn').addEventListener('click', editFromDetail);
    document.getElementById('deleteFromDetailBtn').addEventListener('click', deleteFromDetail);
}

// Open add modal
function openAddModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add Work';
    document.getElementById('workForm').reset();
    document.getElementById('colour').value = '#4A90E2';
    updateFormFields();
    document.getElementById('modal').classList.add('active');
}

// Open edit modal
function openEditModal(id) {
    const work = works.find(w => w.id === id);
    if (!work) return;
    
    currentEditId = id;
    document.getElementById('modalTitle').textContent = 'Edit Work';
    
    // Populate form
    document.getElementById('category').value = work.category;
    document.getElementById('name').value = work.name;
    document.getElementById('rating').value = work.rating;
    document.getElementById('status').value = work.status;
    document.getElementById('firstDate').value = work.firstDate || '';
    document.getElementById('rewatches').value = work.rewatches || 0;
    document.getElementById('comment').value = work.comment || '';
    document.getElementById('note').value = work.note || '';
    document.getElementById('colour').value = work.colour || '#4A90E2';
    
    updateFormFields();
    document.getElementById('modal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentEditId = null;
}

// Close detail modal
function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// Update form fields based on category
function updateFormFields() {
    const category = document.getElementById('category').value;
    const statusSelect = document.getElementById('status');
    const firstDateLabel = document.getElementById('firstDateLabel');
    const rewatchesLabel = document.getElementById('rewatchesLabel');
    
    if (!category) {
        statusSelect.innerHTML = '<option value="">Select status</option>';
        return;
    }
    
    const categoryType = CATEGORIES[category].type;
    const statusOptions = STATUS_OPTIONS[categoryType];
    
    // Update status options
    statusSelect.innerHTML = '<option value="">Select status</option>' +
        statusOptions.map(status => `<option value="${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</option>`).join('');
    
    // Update labels based on category type
    if (categoryType === 'viewing') {
        firstDateLabel.textContent = 'First Viewing';
        rewatchesLabel.textContent = 'Rewatches Done';
    } else {
        firstDateLabel.textContent = 'First Reading';
        rewatchesLabel.textContent = 'Re-readings';
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        category: document.getElementById('category').value,
        name: document.getElementById('name').value,
        rating: parseFloat(document.getElementById('rating').value),
        status: document.getElementById('status').value,
        firstDate: document.getElementById('firstDate').value,
        rewatches: parseInt(document.getElementById('rewatches').value) || 0,
        comment: document.getElementById('comment').value,
        note: document.getElementById('note').value,
        colour: document.getElementById('colour').value
    };
    
    if (currentEditId) {
        // Update existing work
        const index = works.findIndex(w => w.id === currentEditId);
        if (index !== -1) {
            works[index] = { ...works[index], ...formData };
        }
    } else {
        // Add new work
        const newWork = {
            id: generateId(),
            ...formData
        };
        works.push(newWork);
    }
    
    saveWorks();
    renderWorks();
    closeModal();
}

// Delete work
function deleteWork(id) {
    if (confirm('Are you sure you want to delete this work?')) {
        works = works.filter(w => w.id !== id);
        saveWorks();
        renderWorks();
    }
}

// Open detail modal
function openDetailModal(id) {
    const work = works.find(w => w.id === id);
    if (!work) return;
    
    const categoryType = CATEGORIES[work.category].type;
    const firstDateLabel = categoryType === 'viewing' ? 'First Viewing' : 'First Reading';
    const rewatchesLabel = categoryType === 'viewing' ? 'Rewatches Done' : 'Re-readings';
    
    const detailContent = document.getElementById('detailContent');
    detailContent.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Name</div>
            <div class="detail-value">${escapeHtml(work.name)}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Category</div>
            <div class="detail-value">${CATEGORIES[work.category].label}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Rating</div>
            <div class="detail-value">${work.rating}/10</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Status</div>
            <div class="detail-value">${work.status.charAt(0).toUpperCase() + work.status.slice(1)}</div>
        </div>
        ${work.firstDate ? `
        <div class="detail-item">
            <div class="detail-label">${firstDateLabel}</div>
            <div class="detail-value">${formatDate(work.firstDate)}</div>
        </div>
        ` : ''}
        <div class="detail-item">
            <div class="detail-label">${rewatchesLabel}</div>
            <div class="detail-value">${work.rewatches}</div>
        </div>
        ${work.comment ? `
        <div class="detail-item">
            <div class="detail-label">Comment</div>
            <div class="detail-value comment">${escapeHtml(work.comment)}</div>
        </div>
        ` : ''}
        ${work.note ? `
        <div class="detail-item">
            <div class="detail-label">Note</div>
            <div class="detail-value">${escapeHtml(work.note)}</div>
        </div>
        ` : ''}
    `;
    
    // Store the current work ID for edit/delete actions
    document.getElementById('editFromDetailBtn').dataset.workId = id;
    document.getElementById('deleteFromDetailBtn').dataset.workId = id;
    
    document.getElementById('detailModal').classList.add('active');
}

// Edit from detail modal
function editFromDetail() {
    const id = document.getElementById('editFromDetailBtn').dataset.workId;
    closeDetailModal();
    openEditModal(id);
}

// Delete from detail modal
function deleteFromDetail() {
    const id = document.getElementById('deleteFromDetailBtn').dataset.workId;
    closeDetailModal();
    deleteWork(id);
}

// Render all works
function renderWorks() {
    const container = document.getElementById('worksContainer');
    const emptyState = document.getElementById('emptyState');
    
    let filteredWorks = works;
    if (currentFilter !== 'all') {
        filteredWorks = works.filter(w => w.category === currentFilter);
    }
    
    if (filteredWorks.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredWorks.map(work => createWorkCard(work)).join('');
    
    // Add event listeners to cards
    filteredWorks.forEach(work => {
        const card = document.querySelector(`[data-work-id="${work.id}"]`);
        if (card) {
            card.addEventListener('click', (e) => {
                // Don't open detail modal if clicking on action buttons
                if (!e.target.closest('.card-actions')) {
                    openDetailModal(work.id);
                }
            });
            
            const editBtn = card.querySelector('.edit-btn');
            const deleteBtn = card.querySelector('.delete-btn');
            
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditModal(work.id);
                });
            }
            
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteWork(work.id);
                });
            }
        }
    });
}

// Create a work card HTML
function createWorkCard(work) {
    const categoryType = CATEGORIES[work.category].type;
    const firstDateLabel = categoryType === 'viewing' ? 'First Viewing' : 'First Reading';
    const rewatchesLabel = categoryType === 'viewing' ? 'Rewatches' : 'Re-readings';
    
    const statusClass = `status-${work.status.replace(' ', '-')}`;
    
    return `
        <div class="work-card" data-work-id="${work.id}">
            <div class="card-header" style="background-color: ${work.colour}">
                <h3>${escapeHtml(work.name)}</h3>
                <div class="card-category">${CATEGORIES[work.category].label}</div>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <div class="info-row">
                        <span class="info-label">Rating</span>
                        <span class="rating">${work.rating}/10</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status</span>
                        <span class="status-badge ${statusClass}">${work.status.charAt(0).toUpperCase() + work.status.slice(1)}</span>
                    </div>
                    ${work.firstDate ? `
                    <div class="info-row">
                        <span class="info-label">${firstDateLabel}</span>
                        <span class="info-value">${formatDate(work.firstDate)}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">${rewatchesLabel}</span>
                        <span class="info-value">${work.rewatches}</span>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary edit-btn" aria-label="Edit ${escapeHtml(work.name)}">Edit</button>
                <button class="btn btn-danger delete-btn" aria-label="Delete ${escapeHtml(work.name)}">Delete</button>
            </div>
        </div>
    `;
}

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(works, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `verk-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import data from JSON
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                if (confirm('This will replace all current data. Continue?')) {
                    works = imported;
                    saveWorks();
                    renderWorks();
                    alert('Data imported successfully!');
                }
            } else {
                alert('Invalid JSON format. Expected an array of works.');
            }
        } catch (error) {
            alert('Error parsing JSON file: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    e.target.value = '';
}

// Utility: Format date for display
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
