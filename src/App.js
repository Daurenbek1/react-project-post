import { useState } from "react";
import PostItem from "./component/PostItem";
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import './styles/App.css'


function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'JS', body: 'description'},
    {id:2, title:'JAVA', body: 'description'},
    {id:3, title:'C#', body: 'description'},
    {id:4, title:'Python', body: 'description'}
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  
  
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList posts={posts} title="Список постов 1"/>
    </div>
  );
}

export default App;
