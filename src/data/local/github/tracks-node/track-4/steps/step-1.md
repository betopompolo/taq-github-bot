# Step 1/4 - First test setup
### Estimated time: 1 hour

Now you're going to work on another super-important concept on the process of building your own server. Have you ever stopped to think about how you would test if your code works? 🤔
If you thought about performing the query/mutation on one of those applications (browser, graphiql, graphql playground) and checking if it works as expected, that's one way of doing it. But we have a more solid proposal: writing more code for tests! The principle is simple: you give an entrance and check if the response is the expected. Why is it better? Well, some advantages:

1. The time gain: you write your test once, and then you can run it whenever you want.
1. While you develop other features, you can keep running the tests for all the previous implemented queries/mutation to make sure they are still working.
1. Test codes can serve as a kind of documentation as well. People who read them are able to know all the particular scenarios of a query/mutation.

If you search on the Internet, you'll find out there are many ways to test a code. Depending on the project, people decide to use one, or several of them. Here, we're going to write `Integration tests`. For each query/mutation of your server, you're going to setup the database for them, provide some input scenarios, and then check if the response is given as expected. Take some minutes to read about them on the Internet.

Set up tests on your server is not an easy tasks. There are a couple of things to learn and prepare first. As you can imagine, giving the previous steps, there are more cool libraries to help us on this process. We're going to present them one at a time.

The first one is the main library to write the tests codes: [mocha](https://mochajs.org/). Take a look at their docs. It's important to know that mocha provides some methods that can be executed like a timeline. This is very useful to handle tasks in specif orders.

Your task is very simples in this first step:

1. Install the library. You can use the `devDependencies` to install it. Would you be able to say why? 🤔
1. Create a test folder on the root of your project with an `index.ts` inside it.
1. Create a script on your `package.json` to run your tests with `npm run test`
1. Try to execute some code in the right timing, using mocha methods (you don't need to perform them, just use `console.logs` to represent them):
    + Connect to database
    + Run server
    + Setup a test
    + Run a test
