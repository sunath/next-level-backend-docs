# Run App Function
`runApp` function is basically a utility function. It will takes the app instance and few other arguments to run the app easily.
The arguments are
1. App Instance - express app instance
2. port - Port number
3. runningFunction - a function run after the server is on
4. beforeRunningFunction - a function that run before the server is on

The most basic example is as follows.

```javascript
const express = require("express")
const { runApp } = require("fast-express-backend")
const app = express()
app.get("/",(req,res) => res.status(200).send("This is the runApp function"))
runApp(app,8000)
```

As you can see we initialized the app then we create endpoints (not like this most of the time).Finally run it with the port 8000.

Now let's upgrade it.If you look at your console you should get a message like `app is running on port 8000`.But we customize this.I mean we run our own function when the server is up.Just modify it in this way.

```javascript
const express = require("express")
const { runApp } = require("fast-express-backend")
const app = express()
app.get("/",(req,res) => res.status(200).send("This is the runApp function"))

function afterServerIsOn(){
    console.log("Hey there , Server is running on port 8000.Good luck with the server")
}

runApp(app,8000,afterServerIsOn)
```

After making the change you should get a message called `Hey there , Server is running on port 8000.Good luck with the server`.so for the third argument you can pass a function that runs after the server is on.You can use this function for many things.Try to get the best out of it.

Now we are taking a few more steps further.We are going to run a function that runs before the server is on.

```javascript
const express = require("express")
const { runApp } = require("fast-express-backend")
const app = express()
app.get("/",(req,res) => res.status(200).send("This is the runApp function"))

function afterServerIsOn(){
    console.log("Hey there , Server is running on port 8000.Good luck with the server")
}

async function beforeTheServerIsOn(){
    await new Promise((resolve,reject) => {
        setTimeout(() => {resolve(true)},2000)
    })

    console.log("Database is connected")
}

runApp(app,8000,afterServerIsOn,beforeTheServerIsOn)

```

`beforeRunningFunction` can be async or non async.It will run before the server is on.You can use it to connect databases and some other networks if you want.