<!-- # 🍬 Sweet Shop Management System

A clean and modular backend system to manage sweet inventory using **Test-Driven Development (TDD)** and **SOLID principles**. Users can perform core operations like adding, viewing, deleting, searching, sorting, purchasing, and restocking sweets.

---

## ✨ Features

- ✅ Add new sweets (name, category, price, quantity)
- ✅ Delete sweets by ID
- ✅ View all available sweets
- ✅ Search sweets by:
  - Name
  - Category
  - Price range
- ✅ Sort sweets by price:
  - Ascending
  - Descending
- ✅ Purchase sweets:
  - Validates stock before purchase
  - Decreases quantity accordingly
- ✅ Restock sweets:
  - Increases quantity
  - Validates inputs and throws errors for invalid inputs

---

## 🧠 Tech Stack

- **JavaScript (ES6)**
- **Jest** – Unit testing framework
- **Node.js** – Runtime environment
- **TDD** – Red-Green-Refactor cycle
- **SOLID** – Clean architecture principles

---

## 💻 Project Structure

```
sweet-shop-management/
├── models/
│   └── Sweet.js              # Sweet entity class
├── store/
│   └── SweetStore.js         # Core sweet logic and inventory operations
├── tests/
│   └── SweetStore.test.js    # Jest test cases for all features
├── README.md                 # Project documentation
├── package.json              # Node.js project configuration
└── jest.config.js            # Test configuration
```

---

## ⚙️ Getting Started

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/notKaushaL/sweet-shop-management.git
cd sweet-shop-management
```

### 2. 📥 Install Dependencies

```bash
npm install
```

### 3. 🧪 Run All Tests

```bash
npm test
```

✅ All operations are covered with meaningful test cases using **TDD** approach.

---

## 🤖 AI-Assisted Development

This project uses AI tools like **ChatGPT** to improve code quality, generate boilerplate, follow SOLID principles, and maintain best TDD practices.  


---

## 📄 License

This project is built for educational and assessment use. © 2025 -->
