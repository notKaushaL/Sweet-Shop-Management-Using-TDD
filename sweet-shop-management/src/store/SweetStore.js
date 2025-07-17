class SweetStore {
  constructor() {
    this.sweets = [];
  }

  // Adds a sweet to the store if ID is unique
  addSweet(sweet) {
    const exists = this.sweets.some(s => s.id === sweet.id);
    if (exists) {
      throw new Error("Sweet with this ID already exists");
    }
    this.sweets.push(sweet);
  }

  // Returns all sweets in the store
  getAllSweets() {
    return this.sweets;
  }

  // Deletes a sweet with the given ID, throws error if not found
  deleteSweetById(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Sweet with ID ${id} not found`);
    }
    this.sweets.splice(index, 1);
  }

  // Search by partial name (case-insensitive)
  searchByName(name) {
    return this.sweets.filter(sweet =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Search by category (case-insensitive)
  searchByCategory(category) {
    return this.sweets.filter(sweet =>
      sweet.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search by price range
  searchByPriceRange(minPrice, maxPrice) {
    return this.sweets.filter(sweet =>
      sweet.price >= minPrice && sweet.price <= maxPrice
    );
  }

  // Sort sweets by Price in ascending order
  sortByPriceAsc() {
    return [...this.sweets].sort((a, b) => a.price - b.price);
  }

  // Sort sweets by Price in descending order
  sortByPriceDescending() {
    return [...this.sweets].sort((a, b) => b.price - a.price);
  }



  // Reduces stock after a successful purchase
  purchaseSweet(id, quantity) {
  const sweet = this.sweets.find(s => s.id === id);

    // Throw error if no sweet is found with the given ID (Test - 2)
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`);
    }

    // Throw error if requested quantity exceeds available stock (Test - 3)
      if (sweet.quantity < quantity) {
      throw new Error("Not enough stock to complete the purchase");
    }

    // Reduce the available quantity after a successful purchase (Test -1)
    sweet.quantity -= quantity; 
  }


  // Restock sweet by ID
  restockSweet(id, quantityToAdd) {

     // Check for invalid restock quantity (Test - 3)
    if (quantityToAdd <= 0) {
      throw new Error("Restock quantity must be a positive number");
    }

     // Find the sweet by ID (All Tests)
    const sweet = this.sweets.find(s => s.id === id);

     // If sweet not found, throw error (related to Test 2)
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`);
    }

     // Increase the sweet’s quantity (Test 1 success path)
    sweet.quantity += quantityToAdd;
  }

}

export default SweetStore;
