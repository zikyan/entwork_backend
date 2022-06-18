import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export const getSearch = async (req,res)=>{
  var Users=''
  var temp=''
    try {
      var { q } = req.query;
      if(q.charAt(0)==='@'){
        q = q.substring(1);
        temp = await User.find()
        Users = temp.filter(function(item) {
          return item.first.includes(req.query.q.substring(1));
        });
        const keys = ["first", "last", "profilePicture"];
        const search = (data) => {
          return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
          );
          
        };

        q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
        
      }else if(q.charAt(0)==='%'){
        q = q.substring(1);
        temp = await Post.find()
        Users = temp.filter(function(item) {
          return item.text.includes(req.query.q.substring(1));
        });
        const keys = ["text"];
        const search = (data) => {
          return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
          );
          
        };

        q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
      }

      else if(q.charAt(0)==='$'){
        q = q.substring(1);
        temp = await Job.find()
        Users = temp.filter(function(item) {
          return item.caption.includes(q);
        });
        const keys = ["caption"];
        const search = (data) => {
          return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
          );
          
        };

        q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
      }
      else{
        res.json(null)
      }
      
      
      // const Users = await User.find()
          // const Users= temp.concat(...zik)
        
        // const keys = ["first", "text"];
      
        
        // const { q } = req.query;
        
        
    } catch (error) {
        res.status(500).json(error);
    }
}