
const { DATABASE_TYPES } = require("fast-express-backend/databases")
const {DataClass, validators, DataClassFactory} = require("fast-express-backend/dataclasses")

class UserDataClass extends DataClass {
        username = {
            type:String,
            validations:[validators.is_required("Username is required")]
        }
}

const user = new UserDataClass()
user.init({'username':null})

async function runner(){
    const response = await user.validate()
    console.log(response)
}

runner().then(e => console.log(e)).catch(error => console.error(error))
