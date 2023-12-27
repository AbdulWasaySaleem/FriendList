import mongoose from "mongoose";
const FirendSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    age:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    image:{
        type: String, 
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    }
})

const FriendModel = mongoose.model('friends', FirendSchema)
export default FriendModel