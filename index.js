const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const parseRedditPosts = (data) =>{
    try{
    const posts = data.data.children;
    posts.splice(0,1);
    return posts;
    } catch(e){
        console.error(e);
    }
    
}

app.use(express.static('public'));

app.get('/api/redditviewer/:sub',(req,res)=>{
    axios.get("http://reddit.com/r/"+req.params.sub+".json")
        .then(response =>{
            try{
            res.json(parseRedditPosts(response.data));
            }catch(e){
                console.error(e);
            }
        })
    
})
app.get('/api/redditviewer/:sub/:after',(req,res)=>{
    axios.get("http://reddit.com/r/"+req.params.sub+".json?after="+req.params.after)
        .then(response =>{
            try{
            res.json(parseRedditPosts(response.data));
            }catch(e){
                console.error(e);
            }
        })
    
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})