
import mongoose from "mongoose";

//Schema of the users input
const itemSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required : true,
    },
    referalCode : {
      type : String,
      required : false
    }
})

const itemModel = mongoose.model('Items', itemSchema)

export default itemModel