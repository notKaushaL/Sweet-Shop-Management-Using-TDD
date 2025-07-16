# 🍬 Sweet Shop Management System - Full Stack Application

## Project Overview

This is a full-stack application for managing a sweet shop inventory, built as part of the Incubyte Assessment. The system allows users to perform various operations related to sweet management, including adding, deleting, searching, and purchasing sweets.

The project follows Test-Driven Development (TDD) principles and is organized into three main components:

1. **Backend Management Library** (`sweet-shop-management/`): Core business logic and models
2. **REST API** (`sweet-shop-api/`): Express.js REST API that exposes the management functionality
3. **Frontend** (`sweet-shop-frontend/`): Next.js web application with a responsive UI

## Technologies Used

### Backend
- Node.js
- Express.js
- JavaScript ES Modules
- Jest (for testing)

### Frontend
- Next.js 15.4.1
- React 19.1.0
- Tailwind CSS
- Axios (for API communication)

## Features

1. **Operations**
   - Add Sweets: Users can add new sweets with ID, name, category, price, and quantity.
   - Delete Sweets: Users can remove sweets from the inventory.
   - View Sweets: Users can view all available sweets.

2. **Search & Sort Features**
   - Search: Users can search for sweets by name, category, or price range.
   - Sort: Sweets can be sorted by price (ascending/descending) or by name.

3. **Inventory Management**
   - Purchase Sweets: Users can purchase sweets, which decreases the inventory.
   - Restock Sweets: Admins can restock sweets to increase the inventory.

## Project Structure

The project is divided into three main components:

1. **Backend API (`sweet-shop-api`)**
   - Models: Contains the Sweet model class
   - Store: Contains the SweetStore business logic
   - Server: Express.js API endpoints

2. **Frontend (`sweet-shop-frontend`)**
   - Components: Reusable UI components
   - Pages: Next.js pages for the application
   - Services: API communication layer

3. **Original Backend (`sweet-shop-management`)**
   - The original TDD-developed backend with test cases

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/notKaushaL/sweet-shop-management-Using-TDD.git
   ```

2. Start the backend API:
   ```
   cd sweet-shop-api
   npm install
   npm start
   ```

3. Start the frontend application:
   ```
   cd sweet-shop-frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Add a new sweet
- `DELETE /api/sweets/:id` - Delete a sweet by ID
- `GET /api/sweets/search` - Search sweets by name, category, or price range
- `GET /api/sweets/sort` - Sort sweets by price
- `POST /api/sweets/:id/purchase` - Purchase a sweet (reduce inventory)
- `POST /api/sweets/:id/restock` - Restock a sweet (increase inventory)
- `GET /api/categories` - Get all unique categories

## Testing

The original backend (`sweet-shop-management`) includes test cases developed using TDD (Test-Driven Development). You can run these tests to verify the functionality of the core business logic.

## Screenshots

Home Page:
![Home Page](path/to/home-screenshot.png)

Sweets Catalog:
![Sweets Catalog](path/to/catalog-screenshot.png)

Admin Panel:
![Admin Panel](path/to/admin-screenshot.png)

## Contributors

- Kaushal - [notKaushaL](https://github.com/notKaushaL)

## Original Backend Details

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
