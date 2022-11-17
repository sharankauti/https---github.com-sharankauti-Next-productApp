import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    orderItems:[{
        name:{type:String,required:true},
        image:{type:String,required:true},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true},

    }],
    shippingAddress:{
        fullName:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        postalCode:{type:Number,required:true},
    },
    shippingPrice:{type:Number,required:true},
    taxPrice:{type:Number,required:true},
    TotalPrice:{type:Number,required:true},
    itemsPrice:{type:Number,required:true},
    paymentMethod:{type:String,required:true},
    isPaid :{type:Boolean,required:true,default:false},
    isDeliverd :{type:Boolean,required:true,default:false},
    paidAt:{ type:Date},
    deliverdAt:{ type:Date}
   
},{
    timestamps:true
})

const orderModel = mongoose.models.orderModel ||  mongoose.model('orderModel',orderSchema)

export default orderModel;