import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true,default:false},
},{
    timestamps:true
})

const userModel = mongoose.models.userModel ||  mongoose.model('userModel',userSchema)

export default userModel;