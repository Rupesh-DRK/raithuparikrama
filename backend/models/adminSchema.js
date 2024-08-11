import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Dob: { 
        type: Date,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    Alternative_mobile: {
        type: String
    },
    type:{
        type:String,
        default:"admin"
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
