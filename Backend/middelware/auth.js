
const jwt = require("jsonwebtoken");
const User = require("../Model/user");


const authMiddlwere = async (req, res, next) => {
    try {
        const Authorization = req.header('Authorization')
            ? req.header('Authorization').split('Bearer ')[1] : null
        console.log("error", Authorization)

        if (!Authorization) {
            return res.status(401).json({
                msg: "no Token Provide"
            })
        }


        const verifyTokean = await jwt.verify(Authorization, process.env.JWT_SECRET);
       
       
        console.log("verifyToken", verifyTokean)
          
        
        const userId = verifyTokean._id;

        const userInfo = await User.findById(userId);

        if (userInfo) {
            req.user = userInfo;
            req.user.password = undefined;
            next()
        }
        else {
            return res.status(401).json({
                msg: "unathorizes access"
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            msg: "Internal server error, please try again"
        })
    }
}


const authAdminMiddlwere = async (req, res, next) => {
    try {
        const Authorization = req.header('Authorization')
            ? req.header('Authorization').split('Bearer ')[1] : null
        console.log("error", Authorization)

        if (!Authorization) {
            return res.status(401).json({
                msg: "no Token Provide"
            })
        }


        const verifyTokean = await jwt.verify(Authorization, process.env.JWT_SECRET);
       
       
        console.log("verifyToken", verifyTokean)
          
        
        const userId = verifyTokean._id;

        const userInfo = await User.findById(userId);

        if (userInfo && userInfo.role === 1) {
            req.user = userInfo;
            req.user.password = undefined;
            next()
        }
        else {
            return res.status(401).json({
                msg: "unathorizes access"
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            msg: "Internal server error, please try again"
        })
    }
}
module.exports = {
    authMiddlwere,
    authAdminMiddlwere
}