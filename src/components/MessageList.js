import React, { useEffect } from 'react';
import './style/messageList.css'


const MessageList = ({token, messages, setMessages, user, setUser}) => {

    const getMessageList = async () => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me', { 
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        setMessages(data.data.messages) 
        setUser(data.data.username) 
    }
    useEffect (() => {
        if (token){
        getMessageList()
        }
    }, []);

    return <>
        {
        <div className="message-list-container">
            <div className="inbox">
                <h2 className="messages-to-from">Inbox</h2>
                         {messages.map((message, idx)  => {           
                 return message.fromUser.username !== user ? 
                 <div className="message-list">
                    <div className="messages" key={idx}>
                    <img src={require('./style/envelope.jpg')}alt="envelope with flowers"/>
                        <p id="inbox-title">Re: {message.post.title}</p>
                        <p>Message: {message.content}</p>
                        <p>From: {message.fromUser.username}</p>
                    </div>
                </div>
                : ''
            })}
            </div>
            <div className="outbox">
                <h2 className="messages-to-from">Outbox</h2>
                {messages.map((message, idx) => {
                    return  message.fromUser.username == user ? 
                    <div className="message-list">
                        <div className="messages" key={idx}>
                        <img src={require('./style/envelope.jpg')} alt="envelope with flowers"/>
                            <p id="inbox-title">Re: {message.post.title}</p>
                            <p>Message: {message.content}</p>
                            <p>From: {message.fromUser.username}</p>
                        </div>
                    </div>
                     : ''
                    })}  
            </div>  
        </div>
        }
        </>
}


export default MessageList;


