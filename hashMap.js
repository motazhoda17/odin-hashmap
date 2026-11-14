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
}
