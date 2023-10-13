import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        maxlength:256,
    },
    userEmail:{
        type:String,
        required:true,
        index: {
            unique: true, 
        },
        match:/.+\@.+\..+/,
        maxlength:256,
    },
    userMobile:{
        type:Number,
        required:true,
        maxlength:15,
    },
    userPassword:{
        type:String,
        required:true,
    },
    userStatus:{
        type:String,
        default:"Active"
    },
},
{timestamps:true}
)

const UserSchema = mongoose.model("UserSchema",userSchema);
export default UserSchema;