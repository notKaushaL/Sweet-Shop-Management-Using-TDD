# 🍬 Sweet Shop Management System

A clean and test-driven JavaScript backend application for managing a sweet shop — built with a focus on **TDD**, **SOLID principles**, and **clean code practices**.

---

## 📟 Features

* ✅ **Add Sweets** — Unique ID, name, category, price & quantity
* 🗑️ **Delete Sweets** — Remove sweets by ID
* 👀 **View All Sweets** — See full sweet inventory
* 🔍 **Search** by:

  * Name (case-insensitive, partial match)
  * Category
  * Price range
* ↕️ **Sort Sweets** by price:

  * Ascending
  * Descending
* 🛒 **Purchase Sweets** — Decrease stock and handle errors for insufficient quantity
* 📦 **Restock Sweets** — Increase stock with validation

---

## 🛠️ Tech Stack

* **Language**: JavaScript (ES Modules)
* **Testing**: Jest
* **Design**: TDD, SOLID principles, Clean Code
* **Version Control**: Git

---

## 📦 Install Dependencies & Run Tests

### 1. Clone the Repository

```bash
git clone https://github.com/notKaushaL/Sweet-Shop-Management-Using-TDD.git
cd Sweet-Shop-Management-Using-TDD
```

### 2. Install Project Dependencies

```bash
npm install
```

### 3. Run Tests

```bash
npm test
```

### 4. View Coverage Report (Optional)

After tests run, open the detailed coverage report:

```bash
coverage/lcov-report/index.html
```

---

## 🧪 TDD in Action

* All logic is written using **Test-Driven Development**
* High test coverage with **meaningful test cases**
* Every functionality is tested before implementation

---

## 📁 Project Structure

```
├── src/
│   ├── models/        # Sweet model
│   └── store/         # Business logic (SweetStore)
├── tests/             # Unit tests using Jest
├── coverage/          # Test coverage reports
├── jest.config.js     # Jest configuration
├── package.json       # Scripts & dependencies
└── README.md
```

---

## 🔀 Commit Strategy

* ✅ Frequent, atomic commits per TDD flow
* ✅ All AI-assisted commits labeled as **AI Assisted**
* ✅ Clear and professional commit messages

---

## 🧠 AI Usage

This project leverages AI tools like ChatGPT to assist with boilerplate generation, ensure clean code practices, follow TDD, and maintain SOLID principles throughout the development lifecycle.

---

## 📌 License

This project is open-sourced under the [MIT License](LICENSE).
