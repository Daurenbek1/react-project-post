import { useState } from "react";
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

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  
  return (
    <div className="App">
      <PostForm create={createPost}/>
      {posts.length != 0 
        ?
        <PostList remove={removePost} posts={posts} title="Список постов 1"/>
        : <h1 style={{textAlign:'center'}}>Список постов пуст</h1>
      }
      
    </div>
  );
}

export default App;
