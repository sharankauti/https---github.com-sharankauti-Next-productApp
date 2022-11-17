import nc from "next-connect";
import orderModel from "../../../modals/orders";
import db from "../../../utils/db";
import {onError} from "../../../utils/db" 
import  {isAuth} from "../../../utils/auth"
import Cookies from "js-cookie";

const handler = nc({ onError });
handler.use(isAuth);

handler.post(async(req,res)=>{
    await db.connect();
    const newOrder = new orderModel({
        ...req.body,
        user: req.user._id
    })
    const orders = await newOrder.save();
    // Cookies.set('orderInfo',JSON.stringify(orders))
    res.status(201).send(orders)
})

export default handler;