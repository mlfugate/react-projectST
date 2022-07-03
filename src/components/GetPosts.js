import React, { useState, useEffect } from 'react';
import { DeletePost, MessageForm } from './index';
import './style/post.css'

const GetPosts = ({token, setToken, setUser}) => {
    const [postList, setPosts] = useState([])

    const fetchPosts = async () => {
        if (token) {
            setToken(token)
                const reponse = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts', {
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })
                const {data: {posts}} = await reponse.json()
                setPosts(posts)
            }
                else {
                const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts')
                const {data: {posts}} = await response.json();
                setPosts(posts)
                }
        }
    
        useEffect (() => {
            fetchPosts();
        }, []);

          return <>
                <div className="post-bg">
                    <div className='post-wrapper'>
            {
            postList.map(post => {
                const {title, price, location, description,  _id, author, isAuthor, willDeliver} = post;
                return  (
                    <div className="post-container" key={_id}>
                    <div className="post">
                            <h1 className="post-title"><b>{title}</b></h1>
                            <div className="post-description"><b>Description:</b>  {description}</div>
                            <div className="price"><b>Price:</b>  {price}</div>
                            <div className="location"><b>Location:</b>  {location}</div>
                            <div className="will-deliver"><b>Will Deliver?</b> {willDeliver === true? 'Yes' : 'No'}</div>
                            <div className="seller"><b>Seller:</b>  {author.username}</div> 
                {
                    isAuthor ?< DeletePost token={token} postList={postList} setPosts={setPosts} postId={_id}/> : ''
                } 
                {
                    token && !isAuthor ? 
                    <MessageForm token={token} setUser={setUser} postId={_id} setPosts={setPosts}/> : ''
                }
                </div>
                </div>
                )
            })
        }
        </div>
        </div>
    </>
}

        
export default GetPosts;
