# Expense Tracker

A simple, elegant web application to track your daily expenses with a modern and responsive design.

## Features ✨

✅ **Add Expenses** - Enter expense name and amount  
✅ **View All Expenses** - See a complete list of all your expenses  
✅ **Total Amount** - Automatically calculates total expenses  
✅ **Delete Expenses** - Remove any expense from the list  
✅ **Data Persistence** - All data is saved to your browser's localStorage  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Modern UI** - Beautiful gradient design with smooth animations  
✅ **Input Validation** - Prevents invalid entries  

## How to Use 🚀

1. **Add an Expense:**
   - Enter the expense name (e.g., "Grocery", "Gas")
   - Enter the amount
   - Click "Add Expense" or press Enter

2. **View Expenses:**
   - All expenses are displayed in a list below
   - Each expense shows the name, date, and amount
   - The total is calculated automatically at the top

3. **Delete an Expense:**
   - Click the "Delete" button next to any expense
   - Confirm the deletion

4. **Data is Saved:**
   - Your expenses are automatically saved to your browser
   - Refresh the page - your data will still be there!

## File Structure 📁

```
Expense-Tracker/
├── index.html    # Main HTML structure
├── style.css     # Styling and responsive design
├── script.js     # JavaScript functionality
└── README.md     # This file
```

## Technologies Used 💻

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - Core functionality without dependencies
- **LocalStorage API** - Client-side data persistence

## Browser Compatibility 🌐

Works on all modern browsers:
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Opera (76+)

## Features Details 🎯

### Security
- HTML escaping to prevent XSS attacks
- Input validation for all user entries

### Performance
- Lightweight (no external dependencies)
- Fast rendering and updates
- Smooth animations

### UX/UI
- Gradient purple theme
- Smooth transitions and hover effects
- Confirmation before deletion
- Enter key support for quick input
- Mobile-optimized interface

## Local Storage 💾

All expenses are stored in browser's localStorage as JSON. To clear data:
1. Open browser DevTools (F12)
2. Go to Application/Storage > Local Storage
3. Find this website and clear the data

Or use the Console: `localStorage.clear()`

## License 📄

This project is public and free to use!

---

Made with ❤️ by Nancyriya27
