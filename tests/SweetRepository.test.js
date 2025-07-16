

const SweetRepository = require('../src/repository/SweetRepository');
const Sweet = require('../src/models/Sweet');



// Unit test for addSweet() method in SweetRepository

describe('SweetRepository.addSweet()', () => {


    // Test: Should successfully add a new sweet to the repository

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
