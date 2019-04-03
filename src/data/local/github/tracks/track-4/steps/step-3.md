# Step 3 - Integrate the app with the server
#### Estimated time: TODO: add estimated time

In the previous step you made a GraphQL query using the GraphiQL tool, right? For this step, we'll make the same query in your project (code time 🎉).

In order to make GraphQL requests, we suggest the [Apollo Client](https://www.apollographql.com/docs/react/), but you can use any library you want.

Once the library is installed, your job is to do the **login mutation** when the user presses the login button (which makes sense 🤔).


## Login screen behaviour
When you finish this step, your login screen should have the following behaviour:

- Your form should not allow the user to submit the login request if there is an invalid/missing piece of data (i.e invalid email format, etc).

- In order to avoid submitting more than once, your app should block the submit button.

### On Login Success
If everything goes well with the login mutation, you should:
- Store the received token, which will be used in your latter GraphQL requests.
- Navigate to the User List page. It can be a blank page, since we don't implements it yet.

When **storing the token** you can use any method you want to save this data, but remember that **it should persist even if the user quits the application**.

Here are a few common options to store these data locally: 
- Local database
- Local preferences
- Local storage

### On Login Error
If you get an error with the login mutation, just **show the error message you'll receive from server**.

The error response you'll receive in this case will have the following structure:

```json
{
    "data": null,
    "errors": [
        {
            "name": "string",
            "original": "string",
            "message": "string"
        }
    ]
}
```
