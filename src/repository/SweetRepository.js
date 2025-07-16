
class SweetRepository {
  constructor() {
    this.sweets = [];
  }


    // Adds a sweet to the repository if ID is unique

    addSweet(sweet) {
        const exists = this.sweets.some(s => s.id === sweet.id);
        if (exists) {
        throw new Error("Sweet with this ID already exists");
        }
        this.sweets.push(sweet);
    }

    
    // Returns all sweets in the repository

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

    // Search by Partial Name
      searchByName(name) {
    return this.sweets.filter(sweet =>
      sweet.name.toLowerCase().includes(name.toLowerCase())  // Substring and Case-insensitive search
    );
    }

    // Search by Category
      searchByCategory(category) {
    return this.sweets.filter(sweet =>
      sweet.category.toLowerCase() === category.toLowerCase()
    );
    }

    // Search by Price Range
    searchByPriceRange(minPrice, maxPrice) {
  return this.sweets.filter(sweet =>
    sweet.price >= minPrice && sweet.price <= maxPrice
  );
}



}

export default SweetRepository;
