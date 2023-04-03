const User = require("../model/users");
const jwt = require("jsonwebtoken");

class Controller {
  login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email: email, password: password },
        { last_login: Date() }
      );
      if (!user) {
        return res
          .status(200)
          .json({ success: false, msg: "try another email  or password" });
      } else {
        let token = jwt.sign({ role: user.role, _id: user._id }, "secret");
        return res
          .status(200)
          .json({ success: true, token: token, msg: "Authenticated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  add = async (req, res, next) => {
    const { email, password, role, name, mobile, section, salary } = req.body;
    try {
      await new User({
        email,
        password,
        role,
        name,
        mobile,
        section,
        salary,
      }).save();
      return res.status(201).json({ success: true, msg: "added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  edit = async (req, res, next) => {
    const { email, password, role, name, mobile, section, salary } = req.body;
    const token=req.headers.authorization?.replace("Bearer ", "");
   
    try {
      if(token){
        const decode= await jwt.verify(token,'secret')
      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          email: email,
          password: password,
          role: role,
          name: name,
          mobile: mobile,
          section: section,
          salary: salary,
        }
      );
      return res.status(200).json({success:true,msg:'edited'})}
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  deactivate= async(req,res,next) =>{
    const {_id}=req.params
    try {
      const user=await User.findOneAndUpdate({_id:_id},{status: 'deactive'})
      return res.status(200).json({success: true, msg: 'deactivated successfuly'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getUser= async(req,res,next) =>{
    const {token}= req.params
    console.log(token)
    try {
      const decoded=  jwt.verify(token,'secret')
      const user= await User.findOne({_id:decoded._id})
      return res.status(200).json({success: true, msg: 'getting user successfuly', data:user})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
}
module.exports = Controller;
