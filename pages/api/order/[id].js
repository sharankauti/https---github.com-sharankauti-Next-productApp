import nc from "next-connect";
import orderModel from "../../../modals/orders";
import db from "../../../utils/db";
import { isAuth } from "../../../utils/auth";
const handler = nc()

handler.use(isAuth)
handler.get(async(req,res)=>{
   await db.connect();
   const order = await orderModel.findById(req.query.id)
   await db.disconnect();
   res.send(order);
})

export default handler;