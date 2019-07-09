import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';
import PostThumb from './components/PostThumb';
import PostFull from './components/PostFull';
import NavBar from './components/NavBar';




function App(){
  const [posts, setPosts] = useState([]);
  const initialSub = getUrlParameter('sub') || 'aww';
  const [selectedSub, setSub] = useState(initialSub);
  const [selectedPost,setSelectedPost] = useState(null);
  
  useEffect(() => {
    const getSubPosts = () =>{
      const URL = `http://localhost:5000/api/redditviewer/${selectedSub}`;
      axios.get(URL).then(res =>res.data).then(data => {
        setPosts(data)
      })
    }
    getSubPosts();
  },[selectedSub])
  return (
    <div className="app">
      <NavBar initialSub={selectedSub} setSub={setSub} />
      <div className="postsHolder">
        
        {posts.map((post, index) =>(
          <PostThumb key={index} post={post} id={index} selectPost={setSelectedPost} />
        ))}
      </div>
      {selectedPost !== null ? <PostFull post={posts[selectedPost]} deselectPost={setSelectedPost} /> : ''}
    </div>
  );
}
//TODO: add pagination
function getUrlParameter(name) {
  name = name.replace(/[/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export default App;