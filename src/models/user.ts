import mongoose, {InferSchemaType, Schema } from "mongoose";

//message schema
const messageSchema = new Schema({
    message : {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    from : {
        type: String,
        default : "Application"
    }
})

//user schema
const userSchema = new Schema({
    username :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    messageArray : [messageSchema]
}, {
    timestamps : true,
    virtuals : {
        userinfo : {
            get() {
                return `username : ${this.username}, email: ${this.email}` 
            }
        }
    }
})

type User = InferSchemaType<typeof userSchema>
const UserModel = mongoose.models.users || mongoose.model<User>("users", userSchema)

export default UserModel