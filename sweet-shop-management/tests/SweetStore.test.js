
import SweetStore from '../src/store/SweetStore.js';
import Sweet from '../src/models/Sweet.js';


// 1) Operations

// Unit test for Adding Sweets

describe('SweetStore.addSweet()', () => {

    // Test: Should successfully add a new sweet
    test('should add a new sweet', () => {
    const store = new SweetStore();                           
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20); 
    store.addSweet(sweet);                                         
    const all = store.getAllSweets();                                

    expect(all).toHaveLength(1);              
    expect(all[0].name).toBe("Kaju Katli");   
  });


  //  Test: Should throw an error when adding a sweet with duplicate ID
  test('should throw on duplicate ID', () => {
    const store = new SweetStore();                             
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);  
    const s2 = new Sweet(1001, "Gulab Jamun", "Milk-Based", 10, 30); 

    store.addSweet(s1);                                              
    expect(() => store.addSweet(s2))                                 
      .toThrow("Sweet with this ID already exists");             // Ensure duplicate check works
  });
});


// Test for viewing all sweets

describe('SweetStore.getAllSweets()', () => {

  // Test: Should return all added sweets
  test('should return all sweets in the repository', () => {
    const store = new SweetStore();
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const s2 = new Sweet(1002, "Gulab Jamun", "Milk-Based", 10, 30);

    store.addSweet(s1);
    store.addSweet(s2);

    const allSweets = store.getAllSweets();
    expect(allSweets).toHaveLength(2);
    expect(allSweets.map(s => s.name)).toEqual(["Kaju Katli", "Gulab Jamun"]);
  });
});

// Test for deleting sweets
describe('SweetStore.deleteSweetById()', () => {

  // Should delete an existing sweet
  test('should delete the sweet with the given ID', () => {
    const store = new SweetStore();
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const s2 = new Sweet(1002, "Gulab Jamun", "Milk-Based", 10, 30);
    store.addSweet(s1);
    store.addSweet(s2);

    store.deleteSweetById(1001);
    const sweets = store.getAllSweets();

    expect(sweets).toHaveLength(1);           
    expect(sweets[0].id).toBe(1002);          
  });

  // Should throw error if sweet not found
  test('should throw error if sweet ID not found', () => {
    const store = new SweetStore();
    const sweet = new Sweet(1003, "Rasgulla", "Milk-Based", 15, 25);
    store.addSweet(sweet);

    expect(() => store.deleteSweetById(9999))
      .toThrow("Sweet with ID 9999 not found");
  });
});



// 2) Search Functionality

    // Search by name
describe('SweetStore.searchByName()', () => {
  let store;

  beforeEach(() => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    store.addSweet(new Sweet(1003, "Chocolate Barfi", "Chocolate", 60, 10));
  });

  // Test that throws TypeError of "repo.searchByName is not a function"
  test('should return the sweet that match name', () => {
    const results = store.searchByName("Gulab");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Gulab Jamun");
  });
});



  // Search by Category
describe('SweetStore.searchByCategory()', () => {
  let store;
  test('should return sweets that match the given category', () => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    store.addSweet(new Sweet(1003, "Rasgulla", "Milk-Based", 25, 10));
    store.addSweet(new Sweet(1004, "Chocolate Barfi", "Chocolate", 60, 5));

    const results = store.searchByCategory("Milk-Based");

    expect(results).toHaveLength(2);
    expect(results.map(s => s.name)).toEqual(["Gulab Jamun", "Rasgulla"]);
  });


    // Search by Price Range
describe('SweetStore.searchByPriceRange()', () => {

  let store;

  beforeEach(() => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    store.addSweet(new Sweet(1003, "Chocolate Barfi", "Chocolate", 60, 10));
    store.addSweet(new Sweet(1004, "Rasgulla", "Milk-Based", 20, 25));
  });

  test('should return sweets within given price range', () => {
    const results = store.searchByPriceRange(25, 55);
    expect(results.map(s => s.name)).toEqual([ "Kaju Katli", "Gulab Jamun"]);
  });
});

});



// 3) Sorting 

 // Sort by Price Ascending
describe('SweetStore.sortByPriceAsc()', () => {
  let store;

  beforeEach(() => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    store.addSweet(new Sweet(1003, "Chocolate Barfi", "Chocolate", 60, 10));
  });

  test('should return sweets sorted by price in ascending order', () => {
    const results = store.sortByPriceAsc();
    expect(results.map(s => s.name)).toEqual(["Gulab Jamun", "Kaju Katli", "Chocolate Barfi"]);
  });
});

  // Sort by Price Descending
describe('SweetStore.sortByPriceDescending()', () => {
  let store;

  beforeEach(() => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    store.addSweet(new Sweet(1003, "Rasgulla", "Milk-Based", 70, 10));
  });

  test('should return sweets sorted by descending price', () => {
    const sorted = store.sortByPriceDescending();
    expect(sorted.map(s => s.name)).toEqual(["Rasgulla", "Kaju Katli", "Gulab Jamun"]);
  });
});


// Purchase Functionality

describe('SweetStore.purchaseSweet()', () => {

  // Test 1: Successfully reduce stock after valid purchase
  test('should reduce quantity of sweet after valid purchase', () => {
    const store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));

    store.purchaseSweet(1001, 5); // purchase 5 units

    const sweet = store.getAllSweets()[0];
    expect(sweet.quantity).toBe(15); // 20 - 5 = 15
  });

  // Test 2: Throw error if purchase quantity exceeds stock
  test('should throw error if requested quantity exceeds available stock', () => {
    const store = new SweetStore();
    store.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 3));

    expect(() => store.purchaseSweet(1002, 5))
      .toThrow("Not enough stock to complete the purchase");
  });

  // Test 3: Throw error if sweet with given ID does not exist
  test('should throw error if sweet with the given ID is not found', () => {
    const store = new SweetStore();

    expect(() => store.purchaseSweet(9999, 2))
      .toThrow("Sweet with ID 9999 not found");
  });

});



// Tests for restocking sweets

describe('SweetStore.restockSweet()', () => {

  let store;

  beforeEach(() => {
    store = new SweetStore();
    store.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
  });

    // Test 1: Should increase stock quantity correctly
    test('should restock a sweet by increasing quantity', () => {
      store.restockSweet(1001, 10);
      const sweet = store.getAllSweets().find(s => s.id === 1001);
      expect(sweet.quantity).toBe(30);  // 20 + 10
    });

    // Test 2: Should throw error if sweet ID does not exist
    test('should throw error if sweet ID not found', () => {
      expect(() => store.restockSweet(9999, 5))
          .toThrow("Sweet with ID 9999 not found");
    });

    // Test 3: Should throw error for invalid restock quantity
    test('should throw error for invalid restock quantity', () => {
      expect(() => store.restockSweet(1001, -5))
          .toThrow("Restock quantity must be a positive number");
    });

});
