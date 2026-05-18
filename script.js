// Get DOM elements
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const addBtn = document.getElementById('addBtn');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Event listeners
addBtn.addEventListener('click', addExpense);
expenseNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});
expenseAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});

// Add expense function
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    // Validation
    if (!name) {
        alert('Please enter an expense name!');
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

// Calculate total
function calculateTotal() {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
}

// Render expenses list
function render() {
    // Clear the list
    expensesList.innerHTML = '';

    // If no expenses, show message
    if (expenses.length === 0) {
        expensesList.innerHTML = '<p class="no-expenses">No expenses yet. Add one to get started!</p>';
        totalAmount.textContent = '0.00';
        return;
    }

    // Create expense items
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-details">
                <div class="expense-name">${expense.name}</div>
                <div class="expense-date">${expense.date}</div>
            </div>
            <div class="expense-amount">$${expense.amount}</div>
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
