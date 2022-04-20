import { useState, useMemo } from "react";
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import './styles/App.css'
import MySelect from "./component/UI/select/MySelect";
import MyInput from "./component/UI/input/MyInput";


function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'JS', body: 'description'},
    {id:2, title:'JAVA', body: 'description'},
    {id:3, title:'C#', body: 'description'},
    {id:4, title:'Python', body: 'description'}
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const [searchQuery, setSearchQuery] = useState('')


  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортед пост')
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    } 
    return posts
  }, [selectedSort, posts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
  }, [searchQuery, sortedPosts])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }
  
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <MySelect 
          defaultValue="сортировка"
          options={[
            {value:'title', name:'По названию'},
            {value:'body', name:'По описанию'}
          ]}
          value={selectedSort}
          onChange={sortPosts}/>
      <MyInput 
          placeholder="поиск..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}/>
      {sortedAndSearchPosts.length != 0 
        ?
        <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"/>
        : <h1 style={{textAlign:'center'}}>Список постов пуст</h1>
      }
      
    </div>
  );
}

export default App;
