import jwt from 'jsonwebtoken'


const signToken = (user)=>{
    return jwt.sign({_id:user._id, name:user.name, email:user.email , isAdmin:user.isAdmin},
        process.env.JWT_SECRETE,
        {
            expiresIn:'30d'
        }
        )
}


// const isAuth = async(req,res,next)=>{
//     console.log(req.headers.authorization);
//     const {token} = req.headers.authorization.split(' ')[1];
   
//     if (!token) {
//         // const token = authorization.slice(7, authorization.length).split(" ")[1];
//         jwt.verify(JSON.stringify(token),process.env.JWT_SECRETE,(err,decode)=>{
//             if (err) {
//                 res.status(401).send({ message: 'Token is not valid' });
//             }
//             else{
//                 req.user = decode
//                 next()
//             }
//         })
//     }
//     else{
//         res.status(401).send({ message: 'Token is not suppiled'})
//     }

// }


const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    
   
    if (authorization) {
      // Bearer xxx => xxx
      const token = authorization.slice(7,authorization.length);
      // const myToken = JSON.stringify(token);
      console.log(token);
      jwt.verify(token, process.env.JWT_SECRETE, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Token is not valid' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'Token is not suppiled' });
    }
  };




export {signToken,isAuth};