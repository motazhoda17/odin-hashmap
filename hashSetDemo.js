import HashSet from "./hashSet.js";

// Extra credit demo. Run with: node hashSetDemo.js
const fruits = new HashSet();

fruits.add("apple");
fruits.add("banana");
fruits.add("apple"); // already there, so nothing changes

console.log("length():", fruits.length()); // 2
console.log("has('apple'):", fruits.has("apple")); // true
console.log("has('cherry'):", fruits.has("cherry")); // false

// Add enough keys to go over the load factor and trigger growth
const moreFruits = ["cherry", "date", "fig", "guava", "kiwi", "lemon", "lime"];
moreFruits.push("mango", "melon", "nectarine", "orange");
moreFruits.forEach((fruit) => fruits.add(fruit));

console.log("length() after adding more:", fruits.length()); // 13
console.log("capacity (grew from 16):", fruits.capacity); // 32

console.log("remove('banana'):", fruits.remove("banana")); // true
console.log("remove('banana') again:", fruits.remove("banana")); // false
console.log("keys():", fruits.keys());

fruits.clear();
console.log("length() after clear():", fruits.length()); // 0
