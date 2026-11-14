import HashMap from "./hashMap.js";

// Prints how full the hash map is, so we can watch it grow.
function printStatus(map, label) {
  const load = map.length() / map.capacity;
  console.log(
    `${label}: length=${map.length()}, capacity=${map.capacity}, load=${load.toFixed(3)}`,
  );
}

// Load factor 0.75, starting capacity 16
const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

printStatus(test, "After 12 entries"); // load 0.750 (full)

// Overwriting should NOT change length or capacity
test.set("apple", "green");
test.set("dog", "black");
printStatus(test, "After overwriting 2 keys"); // still 12 / 16
console.log("apple is now:", test.get("apple")); // green

// One more key pushes the load over 0.75, so capacity doubles to 32
test.set("moon", "silver");
printStatus(test, "After adding moon"); // 13 / 32

// Overwriting after growing still works
test.set("moon", "white");
test.set("kite", "red");
printStatus(test, "After overwriting moon and kite"); // still 13 / 32
console.log("moon:", test.get("moon")); // white
console.log("kite:", test.get("kite")); // red

// Show how evenly the entries are spread across the buckets
console.log(
  "Entries per bucket:",
  test.buckets.map((bucket) => bucket.length).join(" "),
);

// Test the other methods after growing
console.log("get('lion'):", test.get("lion")); // golden
console.log("get('pizza'):", test.get("pizza")); // undefined
console.log("has('frog'):", test.has("frog")); // true
console.log("has('pizza'):", test.has("pizza")); // false
console.log("remove('frog'):", test.remove("frog")); // true
console.log("remove('frog') again:", test.remove("frog")); // false
console.log("length():", test.length()); // 12
console.log("keys():", test.keys());
console.log("values():", test.values());
console.log("entries():", test.entries());

test.clear();
printStatus(test, "After clear()"); // length 0
console.log("keys() after clear:", test.keys()); // []
