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
  let arr = [];
  for(let i=0; i<transactions.length; i++){
    let check=false;
    for(let j=0;j<arr.length; j++){
      if(transactions[i].category == arr[j].category){
        arr[j].totalSpent += transactions[i].price;
        check=true;
      }
    }
    if(check==false){
      let newObj =  Object.assign({}, {category: transactions[i].category,
      totalSpent: transactions[i].price});
      arr.push(newObj)
    }
  }
  return arr;
}

module.exports = calculateTotalSpentByCategory;
