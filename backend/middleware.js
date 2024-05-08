const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=>{
    // getting token
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    // spliting and getting token
    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token, JWT_SECRET);
        if(decode){
            req.userId = decode.userId;
            next();
        } else{
            return res.status(403).json({});
        }
    } catch(err){
        return res.status(403).json({
            error: err
        });
    }
};

module.exports = {
    authMiddleware
}