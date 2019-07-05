import React, {useState, useEffect} from 'react';
import axios from 'axios';

import PostThumb from './components/PostThumb';
import NavBar from './components/NavBar';




function App(){
  const [posts, setPosts] = useState([]);
  const initialSub = getUrlParameter('sub') || 'aww';
  const [selectedSub, setSub] = useState(initialSub);

  

  useEffect(() => {
    const getSubPosts = () =>{
      const URL = `http://localhost:5000/api/redditviewer/${selectedSub}`;
      axios.get(URL).then(res =>res.data).then(data => {
        console.log(data);
        setPosts(data)
      })
    }
    getSubPosts();
  },[selectedSub])

  return (
    <div className="app">
      <NavBar initialSub={selectedSub} setSub={setSub} />
      <div className="postsHolder">
        {posts.count > 0 ? '' : <p>Loading r/{selectedSub}</p>}
        {posts.map((post, index) =>(
          <PostThumb post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

function getUrlParameter(name) {
  name = name.replace(/[/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export default App;