# Simple Expense Tracker React

A modern, responsive expense tracking application built with React that helps you manage your finances with an intuitive interface and powerful features.

## 📄 Copyright & License

**Copyright © 2025 Amit Shelke. All rights reserved.**

This software is proprietary and confidential. Unauthorized copying, distribution, modification, public display, or public performance of this software is strictly prohibited.

### Permitted Uses
- Personal use for learning and non-commercial projects
- Running the application locally for personal expense tracking

### Prohibited Uses
- Redistributing, sublicensing, or selling this software without prior written permission
- Modifying the codebase and distributing modified versions without permission
- Removing or altering copyright notices
- Commercial use without explicit written consent

### Enforcement
Unauthorized use may result in legal action, including injunctive relief and monetary damages to the maximum extent permitted by law.

For licensing inquiries or permissions beyond personal use, please contact the author.

---

## ✨ Features

### 🔐 Authentication System
- **Local Authentication**: Simple email/password signup and signin
- **Persistent Login**: Stay logged in across browser sessions
- **User Profiles**: Personalized experience with avatar/initials display

### 💰 Expense Management
- **Add Transactions**: Record income and expenses with categories
- **Edit Transactions**: Modify amounts inline with real-time updates
- **Delete Transactions**: Remove entries with undo functionality
- **Date Tracking**: Associate transactions with specific dates

### 📊 Analytics & Visualization
- **Balance Overview**: Real-time total balance with animated count-up
- **Income vs Expense**: Clear breakdown of money flow
- **Category Analysis**: Visual charts showing spending patterns
- **Monthly Reports**: Filter and analyze transactions by month

### 📱 Responsive Design
- **Mobile-First**: Optimized for phones, tablets, and desktops
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Glassmorphism effects, smooth animations, and hover states
- **Accessibility**: Keyboard navigation and screen reader support

### 💾 Data Persistence
- **Local Storage**: Transactions saved locally in your browser
- **Export Options**: Download monthly reports as PDF or Excel
- **Data Backup**: Easy export and import of transaction data

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SimpleExpenseTracker-React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

---

## 🎯 Usage Guide

### First Time Setup
1. **Create Account**: Click "Sign in" → "Don't have an account? Sign Up"
2. **Enter Details**: Provide email and password (minimum 6 characters)
3. **Start Tracking**: Begin adding your income and expenses

### Adding Transactions
1. **Navigate to "Add New Transaction"** section
2. **Enter Category**: Describe the transaction (e.g., "Groceries", "Salary")
3. **Set Amount**: 
   - Positive numbers for income
   - Negative numbers for expenses
4. **Add Date**: Select the transaction date
5. **Click "Add transaction"**

### Managing Transactions
- **Edit**: Click the "Edit" button next to any transaction
- **Delete**: Click the "x" button (with undo option)
- **View History**: All transactions are listed in the "History" section

### Exporting Data
1. **Select Month/Year** using the filters above the transaction list
2. **Choose Format**: Click "Download PDF" or "Download Excel"
3. **Save File**: Choose location and filename for your report

### Theme Switching
- **Toggle Dark Mode**: Click the "Dark Mode" button in the header
- **Automatic Persistence**: Your theme preference is saved

---

## 🛠️ Technical Details

### Built With
- **React 16.12.0** - Frontend framework
- **Context API** - State management
- **CSS3** - Styling with CSS variables and animations
- **Local Storage** - Data persistence
- **Chart.js** - Data visualization (via recharts)
- **jsPDF** - PDF generation
- **XLSX** - Excel export functionality

### Project Structure
```
src/
├── components/          # React components
│   ├── AddTransaction.js
│   ├── AuthModal.js
│   ├── Balance.js
│   ├── Header.js
│   ├── IncomeExpenses.js
│   ├── Transaction.js
│   └── TransactionList.js
├── context/            # State management
│   ├── AppReducer.js
│   └── GlobalState.js
├── lib/               # External libraries
│   └── supabaseClient.js
├── App.js             # Main application
├── App.css            # Global styles
└── index.js           # Application entry point
```

### Key Features Implementation
- **Responsive Design**: CSS Grid and Flexbox with media queries
- **State Management**: Reducer pattern with React Context
- **Data Persistence**: Browser localStorage with automatic sync
- **Real-time Updates**: Immediate UI updates with optimistic rendering
- **Error Handling**: Comprehensive error messages and user feedback

---

## 🔧 Customization

### Adding New Features
The modular architecture makes it easy to extend:
- **New Components**: Add to `src/components/`
- **State Logic**: Extend `src/context/AppReducer.js`
- **Styling**: Modify `src/App.css` or component-specific styles

### Theme Customization
CSS variables in `:root` allow easy theme changes:
```css
:root {
  --primary: #4787ed;
  --positive: #0aa900;
  --negative: #c0392b;
  /* Add more variables as needed */
}
```

---

## 📱 Browser Support

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

Note: Some features may require modern browser versions for optimal performance.

---

## 🤝 Contributing

This is a personal project. For feature requests or bug reports, please contact the author directly.

---

## 📄 License

**Copyright © 2025 Amit Shelke. All rights reserved.**

This software is proprietary and confidential. See the full license terms above.

---

## 📞 Contact

**Amit Shelke**
- **Project**: Simple Expense Tracker React
- **Copyright**: © 2025 All rights reserved

For licensing inquiries, permissions, or support, please contact the author directly.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- CSS community for modern styling techniques
- Open source contributors whose libraries made this project possible

---

*Built with ❤️ by Amit Shelke*
