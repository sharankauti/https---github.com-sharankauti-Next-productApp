import nc from "next-connect";
import productModel from "../../../modals/product";
import db from "../../../utils/db"
const handler = nc()

handler.get (async(req,res)=>{
   await db.connect();
   const products = await productModel.find({})
   await db.disconnect();
   res.send(products);
})

export default handler;