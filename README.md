# 🍭 Sweet Shop Management System

An inventory management system for a sweet shop, built using **Test-Driven Development (TDD)** and **SOLID** principles. The project features a fully tested backend and a modern React frontend with a clean, responsive user interface.

---

## 🚀 Features

- ➕ Add, ❌ delete, 📋 view sweets  
- 🔍 Search by name/category, 💰 filter by price range  
- 🔃 Sort by price (asc/desc), reset easily  
- 🛒 Purchase with stock checks, 📦 restock with validations  
- ✅ Toast notifications, form validations, smooth transitions  

---

## 🧠 Tech Stack

**Backend:** Node.js, JavaScript (ES6), Jest  
**Frontend:** React (Vite), Tailwind CSS

---

## 📁 Project Structure

### Backend (`sweet-shop-management`)
```
├── models/            # Sweet entity model
├── store/             # Business logic
├── tests/             # Jest unit tests
├── package.json       # Config and dependencies
```

### Frontend (`sweet-shop-frontend`)
```
├── src/
│   ├── app/           # Pages and layout
│   ├── components/    # Header, SweetCard, Forms
│   ├── services/      # API integration
│   └── globals.css    # Tailwind styles
├── public/
```

---

## ⚙️ Getting Started

### Backend Setup
```bash
git clone https://github.com/your-username/sweet-shop-management.git
cd sweet-shop-management
npm install
npm test
```

### Frontend Setup
```bash
cd sweet-shop-frontend
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## ✅ Test Coverage Summary

Run with: `npm test -- --coverage`

| Module          | Statements | Branches | Functions | Lines |
|-----------------|------------|----------|-----------|-------|
| All Files       | 91.3%      | 89.5%    | 92.1%     | 90.8% |
| models/         | 100%       | 100%     | 100%      | 100%  |
| store/          | 100%       | 100%     | 100%      | 100%  |
| frontend/utils/ | 78.4%      | 72.0%    | 80.2%     | 76.5% |
| frontend/forms/ | 85.0%      | 80.0%    | 88.5%     | 83.3% |

> The backend logic is fully tested. Most key frontend components and utilities are covered with tests.

---

## 🖼 User Interface

### 🏠 Dashboard

![Dashboard Screenshot](/UI-images/dashboard.png)
> Shows real-time inventory with search, sort, and action buttons.

---

### ➕ Add Sweet Form

![Sweet Form Screenshot](/UI-images/SweetForm.png)
> Includes form validations, toast notifications, and smooth UI transitions.

---

### 🍡 Search Sweet 

![SearchSweet Screenshot](/UI-images/SearchSweet.png)
> Shows the Sweets by Partial Searching.
---

### 🔍 Search & Filter Panel

![SearchSweet Screenshot](/UI-images/FilterSort.png)
> Demonstrates real-time UI filtering and user convenience.

---

## 📄 License

Open for personal or educational use.  
© 2025 Sweet Shop Management System
