# Step 3/4 - The last library (for now)
### Estimated time: 30 minutes

The last library fot tests is [chai](https://www.chaijs.com/). Chai is a very complete library that handles assertion, i.e., cheking if the result has the values that were expected to have. As usual, take a look at theis docs, install it on your project and try to use the `expect` function to compare the return of your `Hello` query with the expected value.

Try to use this function as if you were writing a sentence. For example:

```typescript
expect(queryResponseField).to.be.eq('Hello, Taqtiler!');
```