import HashMap from "./hashMap.js";

// Extra credit: a HashSet is like a HashMap that only stores keys.
// Instead of rewriting all the bucket logic, it keeps a HashMap inside and
// stores `true` as a dummy value for every key. This is called
// "composition": building something new out of something that already works.
export default class HashSet {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.map = new HashMap(loadFactor, capacity);
  }

  // Lets main.js read the current capacity, just like on HashMap.
  get capacity() {
    return this.map.capacity;
  }

  // Adds `key` to the set. Adding a key that's already there does nothing.
  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  length() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }
}
