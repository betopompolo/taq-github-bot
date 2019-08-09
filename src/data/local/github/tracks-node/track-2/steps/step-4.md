# Step 4 - Containers everywhere
### Estimated time: 6 hours

Spoiler alert: in the end of this onboard, you'll basically develop a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) of an entity called `User`. So, in order to store the user data in our app, let's create a real database.

## Creating the database containers

There are a lot of setup so far right? In order to reduce the project setup time, we use [Docker containers](https://www.docker.com/) to create a database to work locally while developing. We'll create 2 databases: one for running server locally and another for (spoiler alert 2) the tests. Yeah, we will write tests. 🤓

1. Create a `docker-compose.yml` file on your root project folder.
1. Setup the two databases in the `docker-compose.yml` file. You can use [this example](https://gist.github.com/alanraso/8341faa973918392d55e39a7b323209a) if you want.
1. Run `$ docker-compose up -d` on terminal to mount your containers.

**Note:** Before run `docker-compose` commands, make sure that the docker is running on your mac. Just <kbd>Command</kbd> <kbd>Space</kbd>, type `Docker` and hit <kbd>Enter</kbd>.

**Note 2:** If you want to stop your containers, you can run `$ docker-compose stop` command in your project's root folder.