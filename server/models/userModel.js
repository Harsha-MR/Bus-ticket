
import mongoose from "mongoose";

//Schema of the users input
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    }, // Default to non-admin users
    referalCode : {
      type : String,
      required : false
    }
})

const itemModel = mongoose.model('user', itemSchema)

export default itemModel