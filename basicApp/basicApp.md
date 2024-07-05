# Create the Hello World - Server

First we are gonna import the `express` and a function from the `fast-express-backend`.Just like below import them in your code.

```javascript
const express = require("express")
const { runApp } = require("fast-express-backend")
```

Then we are required to create the `app` instance.We are going to do that using `express`. It's single line of code.

```javascript
const app = express()
```

Then for the time being we will write the endpoints by hand.We are going to write one endpoint.That is the `GET` endpoint in the root of the server.
```javascript
app.get("/",function(req,res){
    return res.status(200).send("This is the most basic response.")
})
```

That's it.Now the only thing left is to run the app.In order to do that we are going to use `runApp` function we just imported from the `fast-express-backend`

```javascript
runApp(app,8000)
```

Then run the file using node and head over to browser. Then just go to `localhost:8000`.Then you should see a text that says `This is the most basic response.`