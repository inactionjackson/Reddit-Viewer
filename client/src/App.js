import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PostThumb from "./components/PostThumb";
import PostFull from "./components/PostFull";
import NavBar from "./components/NavBar";

function App() {
  const [posts, setPosts] = useState([]);
  const initialSub = getSubFromHash() || "aww";
  const [selectedSub, setSub] = useState(initialSub);
  const [selectedPost, setSelectedPost] = useState(null);
  const [bScrolledToEnd, setbScrolledToEnd] = useState(false);
  const SERVER_PORT = process.env.REACT_SERVER_PORT || 5000;

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
    window.onhashchange = () => {
      setSub(getSubFromHash());
    };
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**handles initial load anytime selected sub changes */
    const searchParams = new URLSearchParams();
    searchParams.set("sub", selectedSub);
    window.location.hash = searchParams.toString();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSub]);

  useEffect(() => {
    /**handles infinite scroll load requests */
    if (!bScrolledToEnd) {
      return;
    }
    setbScrolledToEnd(false);
    const getMorePosts = () => {
      const URL = `http://localhost:${SERVER_PORT}/api/redditviewer/${selectedSub}/${
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

const getSubFromHash = () => {
  let sub = null;
  const hash = window.location.hash.split("=");
  if (hash[0] === "#sub") {
    sub = hash[1];
  }
  console.log(sub);
  return sub;
};

export default App;
