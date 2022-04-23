import { useState, useMemo } from "react";
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import './styles/App.css'
import MySelect from "./component/UI/select/MySelect";
import MyInput from "./component/UI/input/MyInput";
import MyModal from './component/UI/MyModal/MyModal'
import PostFilter from "./component/PostFilter";
import MyButton from "./component/UI/button/MyButton";


function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'JS', body: 'description'},
    {id:2, title:'JAVA', body: 'description'},
    {id:3, title:'C#', body: 'description'},
    {id:4, title:'Python', body: 'description'}
  ])

  const [filter, setFilter] = useState({sort:'', query:''})

  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортед пост')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } 
    return posts
  }, [filter.sort, posts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLocaleLowerCase()))
  }, [filter.query, sortedPosts])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
 
  
  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>  
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"/>
    </div>
  );
}

export default App;
