import React, { useState } from 'react';
import './style/messageForm.css'
const MessageForm = ({token, postId}) => {
    const [content, setContent] =useState('');
    
    const onSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${postId}/messages`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                content
                }
            })
        })
        const data = await response.json()
        setContent('');
    }
    return <>
        <form onSubmit={onSubmit} className="message-form">
        <input type="text" className="message-form-input" value={content} onChange={(event) => {
            setContent(event.target.value);
        }} placeholder="Type message here"></input>
        <button className="btn-message" type="submit">SEND MESSAGE</button>
        </form>
        </>
}
export default MessageForm;