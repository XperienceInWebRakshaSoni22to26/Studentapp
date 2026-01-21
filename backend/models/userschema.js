import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    }


});
const Users = mongoose.model("user", userschema);
export default Users;