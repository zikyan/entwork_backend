import Twitter from "twitter";
import dotenv from 'dotenv';
dotenv.config();

var client = new Twitter({
    consumer_key: process.env.API_Key,
    consumer_secret: process.env.API_Key_Secret,
    access_token_key: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret
  });

  export const tweetsData = async (req,res)=>{
    try {
        var params={screen_name:'The_Pakistan_Vi'}
        await client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?', params, function(error, tweets, response) {
            return res.status(200).json(tweets);
        });
        
        
    } catch (error) {
        res.status(500).json('Error : ',error.message);   
    }
  }