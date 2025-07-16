// Created Sweet class after first test failed with TypeError 
// This fixed "Sweet is not a constructor" in the test

class Sweet {
  constructor(id, name, category, price, quantity) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }
}

module.exports = Sweet;
