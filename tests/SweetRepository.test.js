

const SweetRepository = require('../src/repository/SweetRepository');
const Sweet = require('../src/models/Sweet');


// 1) Operations

// Unit test for Adding Sweets

describe('SweetRepository.addSweet()', () => {

    // Test: Should successfully add a new sweet
    test('should add a new sweet', () => {
    const repo = new SweetRepository();                           
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20); 
    repo.addSweet(sweet);                                         
    const all = repo.getAllSweets();                                

    expect(all).toHaveLength(1);              
    expect(all[0].name).toBe("Kaju Katli");   
  });


  //  Test: Should throw an error when adding a sweet with duplicate ID
  test('should throw on duplicate ID', () => {
    const repo = new SweetRepository();                             
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);  
    const s2 = new Sweet(1001, "Gulab Jamun", "Milk-Based", 10, 30); 

    repo.addSweet(s1);                                              
    expect(() => repo.addSweet(s2))                                 
      .toThrow("Sweet with this ID already exists");             // Ensure duplicate check works
  });
});


// Test for viewing all sweets

describe('SweetRepository.getAllSweets()', () => {

  // Test: Should return all added sweets
  test('should return all sweets in the repository', () => {
    const repo = new SweetRepository();
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const s2 = new Sweet(1002, "Gulab Jamun", "Milk-Based", 10, 30);
    
    repo.addSweet(s1);
    repo.addSweet(s2);
    
    const allSweets = repo.getAllSweets();
    expect(allSweets).toHaveLength(2);
    expect(allSweets.map(s => s.name)).toEqual(["Kaju Katli", "Gulab Jamun"]);
  });
});

// Test for deleting sweets
describe('SweetRepository.deleteSweetById()', () => {

  // Should delete an existing sweet
  test('should delete the sweet with the given ID', () => {
    const repo = new SweetRepository();
    const s1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const s2 = new Sweet(1002, "Gulab Jamun", "Milk-Based", 10, 30);
    repo.addSweet(s1);
    repo.addSweet(s2);

    repo.deleteSweetById(1001);               
    const sweets = repo.getAllSweets();       

    expect(sweets).toHaveLength(1);           
    expect(sweets[0].id).toBe(1002);          
  });

  // Should throw error if sweet not found
  test('should throw error if sweet ID not found', () => {
    const repo = new SweetRepository();
    const sweet = new Sweet(1003, "Rasgulla", "Milk-Based", 15, 25);
    repo.addSweet(sweet);

    expect(() => repo.deleteSweetById(9999))  
      .toThrow("Sweet with ID 9999 not found");
  });
});



// 1) Search Functionality

    // Search by name
describe('SweetRepository.searchByName()', () => {
  let repo;

  beforeEach(() => {
    repo = new SweetRepository();
    repo.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    repo.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    repo.addSweet(new Sweet(1003, "Chocolate Barfi", "Chocolate", 60, 10));
  });

  // Test that throws TypeError of "repo.searchByName is not a function"
  test('should return the sweet that match name', () => {
    const results = repo.searchByName("Gulab");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Gulab Jamun");
  });
});



// Search by Category
describe('SweetRepository.searchByCategory()', () => {
  let repo;
  test('should return sweets that match the given category', () => {
    repo = new SweetRepository();
    repo.addSweet(new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20));
    repo.addSweet(new Sweet(1002, "Gulab Jamun", "Milk-Based", 30, 15));
    repo.addSweet(new Sweet(1003, "Rasgulla", "Milk-Based", 25, 10));
    repo.addSweet(new Sweet(1004, "Chocolate Barfi", "Chocolate", 60, 5));

    const results = repo.searchByCategory("Milk-Based");

    expect(results).toHaveLength(2);
    expect(results.map(s => s.name)).toEqual(["Gulab Jamun", "Rasgulla"]);
  });

});
