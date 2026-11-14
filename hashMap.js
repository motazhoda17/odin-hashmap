export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    // When (number of keys / capacity) goes above loadFactor, we grow.
    this.loadFactor = loadFactor;
    // How many buckets we have.
    this.capacity = capacity;
    // Each bucket is an array that holds { key, value } entries. A bucket
    // can hold more than one entry when different keys hash to the same
    // index (a "collision").
    this.buckets = this.createBuckets(capacity);
  }

  createBuckets(capacity) {
    // Array.from makes a separate empty array for every bucket.
    // (new Array(capacity).fill([]) would share ONE array between all of them!)
    return Array.from({ length: capacity }, () => []);
  }

  // Turns a string key into a bucket index between 0 and capacity - 1.
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      // Using % on every loop keeps hashCode small, so long keys can't go
      // past Number.MAX_SAFE_INTEGER and give wrong results.
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // Every bucket access goes through here so we can never use an index
  // outside our buckets (JavaScript arrays would happily let us).
  getBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  // Stores `value` under `key`. If the key already exists, its value is
  // overwritten instead of adding a second entry.
  set(key, value) {
    const bucket = this.getBucket(key);
    const existing = bucket.find((entry) => entry.key === key);

    if (existing) {
      // Same key = update, not a new entry.
      existing.value = value;
      return;
    }

    // Different key (even if it landed in the same bucket) = new entry.
    bucket.push({ key, value });

    // Only a NEW key can push us over the load factor, so we only check here.
    if (this.length() / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  // Doubles the number of buckets and re-adds every entry.
  // We have to re-hash everything because hash() uses `% this.capacity`,
  // so after the capacity changes most keys belong in a different bucket.
  grow() {
    const oldEntries = this.entries();

    this.capacity *= 2;
    this.buckets = this.createBuckets(this.capacity);

    oldEntries.forEach(([key, value]) => {
      // Calling set() is safe: the new capacity is big enough that this
      // won't trigger another grow().
      this.set(key, value);
    });
  }

  // Returns the value stored under `key`, or undefined if it isn't there.
  get(key) {
    const entry = this.getBucket(key).find((item) => item.key === key);
    return entry?.value;
  }

  // Returns true if `key` is in the hash map.
  has(key) {
    return this.getBucket(key).some((entry) => entry.key === key);
  }

  // Removes the entry for `key`. Returns true if it was removed,
  // false if the key wasn't in the hash map.
  remove(key) {
    const bucket = this.getBucket(key);
    const index = bucket.findIndex((entry) => entry.key === key);

    if (index === -1) return false;

    bucket.splice(index, 1); // remove 1 item at `index`
    return true;
  }

  // Returns how many keys are stored.
  length() {
    // Add up the number of entries in every bucket.
    return this.buckets.reduce((total, bucket) => total + bucket.length, 0);
  }

  // Removes every entry (the capacity stays the same).
  clear() {
    this.buckets = this.createBuckets(this.capacity);
  }

  // Returns every [key, value] pair, e.g. [["apple", "red"], ["dog", "brown"]].
  // Order is NOT the insertion order; it depends on which bucket each key
  // landed in. That's normal for a hash map.
  entries() {
    const result = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => result.push([entry.key, entry.value]));
    });
    return result;
  }

  // Returns an array of all keys.
  keys() {
    return this.entries().map(([key]) => key);
  }

  // Returns an array of all values.
  values() {
    return this.entries().map(([, value]) => value);
  }
}
