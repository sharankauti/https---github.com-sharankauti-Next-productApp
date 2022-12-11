import nc from "next-connect";
import orderModel from '../../../modals/orders'
import {onError} from '../../../utils/error'
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
const handler = nc({
    onError
})

handler.use(isAuth)

handler.get (async(req,res)=>{  
    await db.connect();
    const order = await orderModel.findById(req.query.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            email_address: req.body.email_address
        }
        const paidOrder = await order.save();
        res.send({message:'Order Paid', order:paidOrder});
    }else{
        await db.disconnect();
        res.status(404).send({message:'Order Not Found'})
    }
  
})

export default handler;