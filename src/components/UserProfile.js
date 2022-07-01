import React, { useState, useEffect } from 'react';
import DeletePost from './DeletePost';
import './style/userProfile.css';

const UserProfile = ({token, setUser}) => {

    const[postList, setPosts] = useState([])   
    const getUserData = async () => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        setUser(data.data.posts)
        setPosts(data.data.posts)
    }
    useEffect (() => {
        getUserData();   
    }, [token]);

      return <>
      <div className="your-posts">Your Posts</div>
    <div className="post-wrapper">
        {
        postList.map((post, idx) => {
            const {title, price, location, description, _id,  author} = post;
            return  <div className="post-container" key={idx}>
                  <div className="post">
                    <div className="post-title"><strong>{title}</strong></div>
                    <div className="post-description"><strong>Description:</strong>  {description}</div>
                    <div className="price"><strong>Price:</strong>  {price}</div>
                    <div className="location"><strong>Location:</strong>  {location}</div>
                    <div className="seller"><strong>Seller:</strong>You.. again</div> 
                <DeletePost token={token} setPosts={setPosts} postList={postList} postId={_id}/>
                </div>
            </div>
            })
        }
        </div>
    </>
}

export default UserProfile;