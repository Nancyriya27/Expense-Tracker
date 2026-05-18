// Category configuration
const categories = {
    food: { name: 'Food', icon: '🍔', color: '#FF6B6B' },
    travel: { name: 'Travel', icon: '✈️', color: '#4ECDC4' },
    shopping: { name: 'Shopping', icon: '🛍️', color: '#FFE66D' },
    bills: { name: 'Bills', icon: '📄', color: '#A8E6CF' },
    others: { name: 'Others', icon: '📌', color: '#95E1D3' }
};

// Get DOM elements
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseCategoryInput = document.getElementById('expenseCategory');
const addBtn = document.getElementById('addBtn');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentFilter = 'all';

// Event listeners
addBtn.addEventListener('click', addExpense);
expenseNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});
expenseAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});
expenseCategoryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});

// Filter button listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Add expense function
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    // Validation
    if (!name) {
        alert('Please enter an expense description!');
        expenseNameInput.focus();
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount!');
        expenseAmountInput.focus();
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        name: escapeHtml(name),
        amount: amount.toFixed(2),
        category: category,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Add to expenses array
    expenses.push(expense);

    // Save to localStorage
    saveExpenses();

    // Clear inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseCategoryInput.value = 'food';
    expenseNameInput.focus();

    // Update display
    render();
}

// Delete expense function
function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        render();
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Calculate total for filtered expenses
function calculateTotal() {
    const filtered = getFilteredExpenses();
    return filtered.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
}

// Get filtered expenses based on current filter
function getFilteredExpenses() {
    if (currentFilter === 'all') {
        return expenses;
    }
    return expenses.filter(expense => expense.category === currentFilter);
}

// Get category color
function getCategoryColor(category) {
    return categories[category]?.color || '#95E1D3';
}

// Get category icon
function getCategoryIcon(category) {
    return categories[category]?.icon || '📌';
}

// Get category name
function getCategoryName(category) {
    return categories[category]?.name || 'Others';
}

// Render expenses list
function render() {
    // Clear the list
    expensesList.innerHTML = '';

    // Get filtered expenses
    const filtered = getFilteredExpenses();

    // If no expenses, show message
    if (filtered.length === 0) {
        if (currentFilter === 'all') {
            expensesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p class="empty-state-title">No expenses yet</p>
                    <p class="empty-state-text">Add an expense to get started!</p>
                </div>
            `;
        } else {
            expensesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${getCategoryIcon(currentFilter)}</div>
                    <p class="empty-state-title">No ${getCategoryName(currentFilter).toLowerCase()} expenses</p>
                    <p class="empty-state-text">Add an expense in this category!</p>
                </div>
            `;
        }
        totalAmount.textContent = '0.00';
        return;
    }

    // Create expense items with staggered animation
    filtered.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.style.animationDelay = `${index * 0.05}s`;
        
        const categoryColor = getCategoryColor(expense.category);
        const categoryIcon = getCategoryIcon(expense.category);
        const categoryName = getCategoryName(expense.category);

        expenseItem.innerHTML = `
            <div class="expense-category-badge" style="background-color: ${categoryColor}20; border-left: 3px solid ${categoryColor}">
                <span class="category-icon">${categoryIcon}</span>
                <span class="category-name">${categoryName}</span>
            </div>
            <div class="expense-details">
                <div class="expense-name">${expense.name}</div>
                <div class="expense-date">${expense.date}</div>
            </div>
            <div class="expense-amount" style="color: ${categoryColor}">$${expense.amount}</div>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expensesList.appendChild(expenseItem);
    });

    // Update total
    totalAmount.textContent = calculateTotal();
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial render
render();
