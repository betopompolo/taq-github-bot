# Step 5/5 - The Login Mutation test
### Estimated time: 3 hours

Now it's time to (finally) write the tests for your recently implemented `LoginMutation`. But first, some theory: unlike our simple `Hello` query, this mutation is integrated with database. How should be these tests? Well, some general good practices every test you're going to perform. Replace your current `3. run a single test` step with:

+ **Setup the database:** to check if some feature is working, most of the time we need to have a certain state on the database before running the test. For example, we should have at least one valid user on db to make a successful login
+ **Create an input:** you should create one example of input to run your query/mutation. On your login example, it should be a user/password, with an optional rememberMe.
+ **Run the test:** well.... Run the test 🏃.
+ **Check the response:** Given the input **and** the state of database previously set up, you should check if the response is returned as expected. On a successfull login test of yours, a token should be generated and the user info should be returned
+ **Check the database after the test:** in some cases, we change the database after the request. We should check not only if the response is as expected, but also the new values on db.
+ **Clear the database:** we want our tests to be independent, so we can make sure every piece of our lego works and can be properly united on a good system. So, it's important to reset the state of the database after every test, so the next one can be clear to run. You can read more about the importance of independant tests on the internet. We should talk about this too.

Write some tests to your `LoginMutation`. Try to follow those good practices above, and try to predict on your tests as many scenarios as you can, so the tests can be more complete. Some examples:

+ Successful login
+ Wrong e-mail or password
+ User not found

If you finished the challenge, you can also check if the token duration is behaving as expected according to `rememberMe` input

**NOTE:** don't forget that you should connect to the database **before** (not that joke again) beginning the tests. And it should be the right one.
**NOTE 2:** don't forget to open a PR with your tests.
