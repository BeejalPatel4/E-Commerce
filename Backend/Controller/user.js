const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");
// const User = require("../Model/user");
// const { SingUpSchema, loginSchema } = require("../helper/validation");
// const user = require("../Model/user");
const { signUpSchema, loginSchema } = require("../helper/validation");
const { number } = require("joi");

const signUp = async (req, res) => {
  try {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }
    const { name, email, password } = req.body;

    const userInfo = await User.findOne({ email: email });
    if (userInfo) {
      return res.status(400).json({
        msg: "Email already registerad.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.status(200).json({
      msg: "Accound create successfully",
      data: { user },
    });
  } 
  catch (error) {
    // console.log("Enter on SingUp:", error);
    res.status(500).json({ msg: "Something went wrong during Sign Up." });

  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message
      })
    }
    const { email, password } = req.body;

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
      return res.status(400).json({
        msg: "Email Not Found"
      })
    } else if (!bcrypt.compareSync(password, userInfo.password)) {
      return res.status(400).json({
        msg: "Wrong Password"
      })
    } else {
      userInfo.password = String;
      const token = createToken(userInfo);

      return res.status(200).json({
        msg: "Login Successfully",
        data: {
          userInfo,
          token,
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong during Login." 
    //  console.log("Enter on SingUp:", error);
    })
  }
}

const userInfo=async(req,res) =>{
   try{
           const userInfo=req.user
           return res.status(200).json({
            msg:"user Info",
            data:{
              userInfo
            }
           })
   }
   catch (error) {
    // console.log("Enter on SingUp:", error);
    res.status(500).json({ msg: "Something went wrong during Sign Up." });

  }
}

const createToken = (user) => {
  const userData = { _id: user._id, email: user.email, role: user.role };
  const expiresIn = 60 * 60 * 24;
  const token = jwt.sign( userData, process.env.JWT_SECRET, {expiresIn});
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  return { token, expiresIn }
}

module.exports = {
  signUp,
  login,
  userInfo
}
