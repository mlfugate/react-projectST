import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'; 
import './style/addPost.css'
const AddPost = ({token}) => {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState([]);
    const [location, setLocation] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false)
    const [posts, setPosts] = useState([])
    const history = useHistory();

    const addPost = async () => {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                  title: title,
                  description: description,
                  price: price,
                  location: location,
                  isAuthor: isAuthor,
                }
              })
          })
          const {data} = await response.json();
          setTitle('');
          setDescription('');
          setPrice('');
          setLocation('');
          setIsAuthor(true)
          setPosts([...posts, data.post])
          history.push('/users/me')
        }

    const handleSubmit = async(e) => {
        e.preventDefault()
        addPost()
    };
    return <>
        <div className="add-post-container">
        <h3 className="add-post-title">Create your new post!</h3>
            <form onSubmit={handleSubmit} className="add-post-form">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}placeholder="title"></input>
                <textarea type="text" className="description" value={description} onChange={(e) => setDescription(e.target.value)}placeholder="description"></textarea>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}placeholder="price"></input>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}placeholder="location"></input>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    </>

 
}

export default AddPost