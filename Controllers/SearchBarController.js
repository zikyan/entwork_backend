import Post from "../models/postModel.js";
import User from "../models/userModel.js";



export const getSearch = async (req,res)=>{
    try {
      var x = req.query.q.charAt(0)
          const Users = await User.find()
          // const temp = await Post.find()
          // const Users= zik.concat(temp)
      
        const keys = ["first", "last", "email", "profilePicture", "username"];
      
        const { q } = req.query;

  

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
    
  };

  q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
    } catch (error) {
        res.status(500).json(error);
    }
}