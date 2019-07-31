import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PostThumb from "./components/PostThumb";
import PostFull from "./components/PostFull";
import NavBar from "./components/NavBar";

function App() {
  const [posts, setPosts] = useState([]);
  const initialSub = getUrlParameter("sub") || "aww";
  const [selectedSub, setSub] = useState(initialSub);
  const [selectedPost, setSelectedPost] = useState(null);
  const [bScrolledToEnd, setbScrolledToEnd] = useState(false);
  const SERVER_PORT = process.env.SERVER_PORT || 5000;

  const handleScroll = () => {
    /**checks if infinite scroll loading is needed */
    const postHolder = document.getElementsByClassName("postsHolder");
    if (
      window.innerHeight + document.documentElement.scrollTop <
      postHolder[0].offsetHeight
    ) {
      return;
    }
    window.removeEventListener("scroll", handleScroll); // remove listener so event doesn't fire multiple times while next batch is being loaded
    setbScrolledToEnd(true);
  };

  useEffect(() => {
    /**adds scroll event listener for infinite scroll, should only fire at initial load */
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**handles initial load anytime selected sub changes */
    const getSubPosts = () => {
      const URL = `http://localhost:${SERVER_PORT}/api/redditviewer/${selectedSub}`;
      axios
        .get(URL)
        .then(res => res.data)
        .then(data => {
          setPosts(data);
        })
        .catch(e => console.log(e));
    };
    getSubPosts();
  }, [selectedSub]);

  useEffect(() => {
    /**handles infinite scroll load requests */
    if (!bScrolledToEnd) {
      return;
    }
    setbScrolledToEnd(false);
    const getMorePosts = () => {
      const URL = `http://localhost:5000/api/redditviewer/${selectedSub}/${
        posts[posts.length - 1].data.name
      }`;
      axios
        .get(URL)
        .then(res => res.data)
        .then(data => {
          setPosts([...posts, ...data]);
          window.addEventListener("scroll", handleScroll);
        })
        .catch(e => console.log(e));
    };
    getMorePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bScrolledToEnd]);

  return (
    <div className="app">
      <NavBar currentSub={selectedSub} setSub={setSub} />
      <div className="postsHolder">
        {posts.map((post, index) => (
          <PostThumb
            key={index}
            data={post.data}
            id={index}
            selectPost={setSelectedPost}
          />
        ))}
      </div>
      {selectedPost !== null ? (
        <PostFull
          data={posts[selectedPost].data}
          deselectPost={setSelectedPost}
        />
      ) : (
        ""
      )}
    </div>
  );
}
function getUrlParameter(name) {
  name = name.replace(/[/, '\\[').replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export default App;
