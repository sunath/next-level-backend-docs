# Sqlite Database with express


## Create sqlite database
First of all we are going to see how to create a database with sqlite.So we are going to import the functions and classes we need.

```javascript
const { DataClass } = require("fast-express-backend");
const { Databases,DATABASE_TYPES } = require("fast-express-backend/databases");
const sqlite3 = require('fast-express-backend/databases/sqlite3')
```

First two lines are not so important at the moment.We will talk about them soon.So let's just focus on the third line.We just import the sqlite3 database module.

Since this database actions are done async we need to create a high order function that can perform async.Inside that function we will try to create the database and try to connect to it.

```javascript
async function runner(){
    try{
        const database = new sqlite3.SQLiteDatabase("sqlite_test_database.db")
        await database.connect()
        Databases.connections[DATABASE_TYPES.SQLITE] = database
        await database.close()
    }catch(error){
        console.error(error)
        throw error
    }
}
```

We create a new database called `sqlite_test_database.db`.You can see it in your code editor.Then we connect it.Finally we set a static property in our application.This database will used for operations done for sqlite 3 database.That means we will save data in this database. That's what we say when we code the line `  Databases.connections[DATABASE_TYPES.SQLITE] = database`. Notice : at the moment you can only connect one sqlite instance.Then for now we just close the database.

Finally this can be run as a script via node js.So in order to do so we are going to add few lines of code to run the program.

```javascript
runner().then(e => console.log(e)).catch(e => console.error(e))
```


## Create tables in the database

In order to create tables we are going to use classes in javascript.(Of course with `extends`).So we are going to make some changes in the above code.

```javascript
const { DataClass } = require("fast-express-backend");
const { Databases,DATABASE_TYPES } = require("fast-express-backend/databases");
const sqlite3 = require('fast-express-backend/databases/sqlite3')


class User  extends DataClass{
    getName(){return "users"}
    DATABASE_REPRESENTATION = DATABASE_TYPES.SQLITE

    username = sqlite3.createField(sqlite3.types.TEXT,true)
    password = sqlite3.createField(sqlite3.types.TEXT,true)
}
```

Well First we are gonna need a class that extends from the `DataClass`.Before anything we wanna name our table right.So we are gonna override a function called `getName()` in the class.Then we return the name we want.

```javascript
class User  extends DataClass{
    getName(){return "users"}
}
```

Alright.Now we want to define what type of database we are gonna use.We just gonna add a attribute to the class called `DATABASE_REPRESENTATION`.It will represent what type of database we are gonna use.
```javascript
class User  extends DataClass{
    getName(){return "users"}
    DATABASE_REPRESENTATION = DATABASE_TYPES.SQLITE
}
```

Now we define the columns.In this chapter we ain't gonna make relational database stuffs.You can do it using `fast-express-backend`.But for now let's make something simple.We are gonna make a ordinary user with a `username` and `password`.So let's add fields to the class.

```javascript
class User  extends DataClass{
    getName(){return "users"}
    DATABASE_REPRESENTATION = DATABASE_TYPES.SQLITE

    username = sqlite3.createField(sqlite3.types.TEXT,true)
    password = sqlite3.createField(sqlite3.types.TEXT,true)
}
```

The second argument in the `createField` make sure the column is unique.First argument takes the type.That's it for the class.Now let's go and create the table in the database.

```javascript
async function runner(){
    try{
        const database = new sqlite3.SQLiteDatabase("sqlite_test_database.db")
        await database.connect()
        Databases.connections[DATABASE_TYPES.SQLITE] = database
        await database.createTable(User)
        await database.close()
    }catch(error){
        console.error(error)
        throw error
    }

}
```

So we have make some changes to create the table.Now your code should look like this.
```javascript
const { DataClass } = require("fast-express-backend");
const { Databases,DATABASE_TYPES } = require("fast-express-backend/databases");
const sqlite3 = require('fast-express-backend/databases/sqlite3')


class User  extends DataClass{
    getName(){return "users"}
    DATABASE_REPRESENTATION = DATABASE_TYPES.SQLITE

    username = sqlite3.createField(sqlite3.types.TEXT,true)
    password = sqlite3.createField(sqlite3.types.TEXT,true)
}

async function runner(){
    try{
        const database = new sqlite3.SQLiteDatabase("sqlite_test_database.db")
        await database.connect()
        Databases.connections[DATABASE_TYPES.SQLITE] = database
        await database.createTable(User)
        await database.close()
    }catch(error){
        console.error(error)
        throw error
    }

}

runner().then(e => console.log(e)).catch(e => console.error(e))
```

Run the file. Then browse the database using any viewer.You should see the `users` table right there.That's enough for creating tables in sqlite3.