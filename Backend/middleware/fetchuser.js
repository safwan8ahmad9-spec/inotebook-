const jwt=require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    const token = req.header('authToken') || req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        return res.status(401).send({error:"please authenticate using a valid token"})
    }
}
module.exports=fetchuser;