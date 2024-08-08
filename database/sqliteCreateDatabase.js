const { DataClass } = require("fast-express-backend");
const { Databases,DATABASE_TYPES } = require("fast-express-backend/databases");
const sqlite3 = require('fast-express-backend/databases/sqlite3')

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

runner().then(e => console.log(e)).catch(e => console.error(e))