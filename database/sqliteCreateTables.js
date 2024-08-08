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