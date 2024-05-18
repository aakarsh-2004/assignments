/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const categoryTotal = {};

    // Iterate through each transaction
    transactions.forEach(transaction => {
        const { category, price } = transaction;
        
        // If category already exists, add the price to the total
        if (categoryTotal[category]) {
            categoryTotal[category] += price;
        } else {
            // If category does not exist, initialize it with the price
            categoryTotal[category] = price;
        }
    });

    // Convert the object into an array of objects with category and totalSpent properties
    const result = Object.keys(categoryTotal).map(category => ({
        category: category,
        totalSpent: categoryTotal[category]
    }));

    return result;
}

module.exports = calculateTotalSpentByCategory;
