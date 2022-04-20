import MySelect from "./UI/select/MySelect"
import MyInput from "./UI/input/MyInput"


const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MySelect 
                defaultValue="сортировка"
                options={[
                    {value:'title', name:'По названию'},
                    {value:'body', name:'По описанию'}
                ]}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}/>
            <MyInput 
                placeholder="поиск..."
                value={filter.query}
                onChange={e => setFilter({...filter, query:e.target.value})}/>
        </div>
    )
}

export default PostFilter