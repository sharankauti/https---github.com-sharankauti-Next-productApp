import nc from "next-connect";
import productModel from "../../../modals/product";
import db from "../../../utils/db"
const handler = nc()

handler.get (async(req,res)=>{
   await db.connect();
   const product = await productModel.findById(req.query.id)
   await db.disconnect();
   res.send(product);
})

export default handler;