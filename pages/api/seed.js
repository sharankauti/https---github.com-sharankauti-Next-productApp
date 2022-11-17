import nc from "next-connect";
import productModel from "../../modals/product";
import db from "../../utils/db"
import data from '../../utils/data'
import userModel from "../../modals/users";
const handler = nc()

handler.get (async(req,res)=>{
   await db.connect();
   await userModel.deleteMany();
   await userModel.insertMany(data.users)
   await productModel.deleteMany();
   await productModel.insertMany(data.products)
   await db.disconnect();
   res.send({message:'seeded sucess'});
})

export default handler;