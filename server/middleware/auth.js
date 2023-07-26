//auth
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try {
        //extract jwt token
        const token=req.body.token || req.cookies.token;
        
        if(!token){
            res.json({
                success:false,
                message:'Token Missing'
            })
        }

        //verify the token
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);

            req.user=decode;
        } catch (error) {
            res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    } catch (error) {
        res.json({
            success:false,
            message:"Something went wrong while veryfy the token!"
        })
    }
}