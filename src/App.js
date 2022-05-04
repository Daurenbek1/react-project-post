import { useState, useMemo, useEffect } from "react";
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import './styles/App.css'
import MyModal from './component/UI/MyModal/MyModal'
import PostFilter from "./component/PostFilter";
import MyButton from "./component/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts"
import PostService from "./API/PostService";
import Loader from "./component/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";


function App() {

    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: '', query: '' })

    const [modal, setModal] = useState(false)
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
    
    const [ fetchPosts, isPostLoading, postError] = useFetching( async () => {
      const posts = await PostService.getAll();
      setPosts(posts)
    })

    useEffect(() => {
      fetchPosts()
    }, [])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


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
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"/>
      }
    </div>
  );
}

export default App;
