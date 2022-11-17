

const getError = (error) => {
    return (
        error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
    )
}

// const onError = async(error,req,res,next)=>{
//     console.error(error);
//     await db.disconnect();
//     res.status(500).send({message:error.toString()})
//     next(req,res);
// }

export {getError} ;