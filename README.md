# HashMap

My solution to the [HashMap](https://www.theodinproject.com/lessons/javascript-hashmap) project from The Odin Project's Full Stack JavaScript path.

A hash map built from scratch (no built-in `Map` or objects used as storage). Keys are strings.

## Files

| File | What's inside |
| --- | --- |
| `hashMap.js` | The `HashMap` class |
| `hashSet.js` | **Extra credit.** A `HashSet` that stores only keys |
| `main.js` | Runs every step from the lesson's "Test your hash map" section |
| `hashSetDemo.js` | Tries out the `HashSet` |

## How it works

- The map has a **capacity** (number of buckets, starts at `16`) and a **load factor** (`0.75`).
- `hash(key)` turns a key into a bucket index from `0` to `capacity - 1`. It uses `%` on every loop so long keys can't go past `Number.MAX_SAFE_INTEGER`.
- Every bucket is an array of `{ key, value }` entries. When two different keys land in the same bucket (a **collision**), both entries are kept in that bucket.
- Every bucket access goes through `getBucket()`, which throws `"Trying to access index out of bounds"` for a bad index, as the lesson asks.
- When `length() / capacity` goes **above** the load factor, the map **doubles its capacity** and re-hashes every entry into the new buckets. With the lesson's data, the 12th key fills it to exactly `0.75` and `moon` (the 13th) makes it grow from 16 to 32.

## Methods

| Method | What it does |
| --- | --- |
| `hash(key)` | Returns the bucket index for a key |
| `set(key, value)` | Adds the key, or overwrites the value if the key already exists |
| `get(key)` | Returns the value, or `undefined` if the key isn't there |
| `has(key)` | `true` / `false` |
| `remove(key)` | Removes the entry and returns `true`, or returns `false` if the key isn't there |
| `length()` | Number of stored keys |
| `clear()` | Removes every entry |
| `keys()` / `values()` | Arrays of all keys / all values |
| `entries()` | Array of `[key, value]` pairs |

`HashSet` has `add`, `has`, `remove`, `length`, `clear` and `keys`. It keeps a `HashMap` inside and stores `true` as the value for every key.

Like a real hash map, the order of `keys()`, `values()` and `entries()` is **not** the order you added them in.

## How to run

You only need Node.js (v22 or newer runs ES modules with no setup). There is nothing to install.

```bash
node main.js          # the lesson's test steps
node hashSetDemo.js   # the HashSet extra credit
```

## What I practiced

- How hashing turns a key into an array index
- Handling collisions with buckets
- Growing and re-hashing when the load factor is exceeded
- Telling an *update* (same key) apart from a *collision* (different keys, same bucket)
- Reusing a class inside another class (composition) for the `HashSet`
