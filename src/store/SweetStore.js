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


}

export default SweetStore;
