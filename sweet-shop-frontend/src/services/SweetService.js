import Sweet from '../models/Sweet';

/**
 * Service class for handling sweet operations
 * This acts as a frontend interface to the backend
 */
class SweetService {
  constructor() {
    this.sweets = [];
    // In a real application, we'd call the backend API here
    // For now, we'll simulate the backend with local data
  }

  /**
   * Add a new sweet
   * @param {Sweet} sweet - The sweet to add
   * @throws {Error} If a sweet with the same ID already exists
   */
  addSweet(sweet) {
    const exists = this.sweets.some(s => s.id === sweet.id);
    if (exists) {
      throw new Error("Sweet with this ID already exists");
    }
    this.sweets.push(sweet);
    return sweet;
  }

  /**
   * Get all sweets
   * @returns {Array<Sweet>} All sweets in the store
   */
  getAllSweets() {
    return this.sweets;
  }

  /**
   * Delete a sweet by ID
   * @param {string|number} id - The ID of the sweet to delete
   * @throws {Error} If sweet with the ID is not found
   */
  deleteSweetById(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Sweet with ID ${id} not found`);
    }
    this.sweets.splice(index, 1);
  }

  /**
   * Search sweets by name (case-insensitive)
   * @param {string} name - The name to search for
   * @returns {Array<Sweet>} Matching sweets
   */
  searchByName(name) {
    return this.sweets.filter(sweet =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Search sweets by category (case-insensitive)
   * @param {string} category - The category to search for
   * @returns {Array<Sweet>} Matching sweets
   */
  searchByCategory(category) {
    return this.sweets.filter(sweet =>
      sweet.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Search sweets by price range
   * @param {number} minPrice - The minimum price
   * @param {number} maxPrice - The maximum price
   * @returns {Array<Sweet>} Matching sweets
   */
  searchByPriceRange(minPrice, maxPrice) {
    return this.sweets.filter(sweet =>
      sweet.price >= minPrice && sweet.price <= maxPrice
    );
  }

  /**
   * Sort sweets by price in ascending order
   * @returns {Array<Sweet>} Sorted sweets
   */
  sortByPriceAsc() {
    return [...this.sweets].sort((a, b) => a.price - b.price);
  }

  /**
   * Sort sweets by price in descending order
   * @returns {Array<Sweet>} Sorted sweets
   */
  sortByPriceDesc() {
    return [...this.sweets].sort((a, b) => b.price - a.price);
  }

  /**
   * Purchase a sweet
   * @param {string|number} id - The ID of the sweet to purchase
   * @param {number} quantity - The quantity to purchase
   * @throws {Error} If sweet is not found or if not enough stock
   */
  purchaseSweet(id, quantity) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`);
    }
    if (sweet.quantity < quantity) {
      throw new Error("Not enough stock to complete the purchase");
    }
    sweet.quantity -= quantity;
    return sweet;
  }

  /**
   * Restock a sweet
   * @param {string|number} id - The ID of the sweet to restock
   * @param {number} quantityToAdd - The quantity to add
   * @throws {Error} If sweet is not found or quantity is invalid
   */
  restockSweet(id, quantityToAdd) {
    if (quantityToAdd <= 0) {
      throw new Error("Restock quantity must be a positive number");
    }
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`);
    }
    sweet.quantity += quantityToAdd;
    return sweet;
  }

  /**
   * Load sample data for testing
   */
  loadSampleData() {
    this.sweets = [
      new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20),
      new Sweet(1002, "Gajar Halwa", "Vegetable-Based", 30, 15),
      new Sweet(1003, "Gulab Jamun", "Milk-Based", 10, 50),
      new Sweet(1004, "Jalebi", "Flour-Based", 15, 40),
      new Sweet(1005, "Rasgulla", "Milk-Based", 12, 30)
    ];
  }
}

// Create a singleton instance for the app to use
const sweetService = new SweetService();
export default sweetService;
