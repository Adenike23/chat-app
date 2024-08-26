import React, { useEffect, useState } from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'
import {ID, Query} from 'appwrite'
import {Trash2} from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

const Room = () => {
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')
  const {user} = useAuth()

  useEffect(() => {
    getMessages()

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.

      if(response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A MESSAGE WAS CREATED');  
        setMessages(prevMessage => [response.payload, ...prevMessage])

      }
      if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A MESSAGE WAS DELETED!!!'); 
        setMessages(prevMessage => prevMessage.filter(mess => mess.$id !== response.payload.$id))
 
      }
    });

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      // we're passing the id, name and message body to the backend
      user_id: user.$id,
      username: user.name,
      body: messageBody
    }

  let response = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES,ID.unique(), payload)
    console.log('Created!', response);
    // setMessages(prevMessage => [response, ...prevMessage])
    setMessageBody('')
  }

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES, [
      Query.orderDesc('$createdAt'),
      Query.limit(20)
    ])
    // console.log('Response:', response);
    setMessages(response.documents)
    
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
    // setMessages(prevMessage => prevMessage.filter(mess => mess.$id !== message_id))
  }

  return (
    <main className='container'>
      <Header />
      <div className='room--container'>

        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea name="" id="" maxLength='1000' placeholder='Say something...' onChange={(e) => setMessageBody(e.target.value)} value={messageBody} required></textarea>
          </div>

          <div className='send-btn--wrapper'>
            <input type="submit" value='Send' className='btn btn--secondary'/>
          </div>
        </form>

      <div>
        {messages.map(message => (
          <div key={message.$id} className='message--wrapper'>
            <div className='message--header'>
              <p>
                {message?.username ? 
                <span>{message?.username}</span> : 
                <span>Anonymous user</span>}
                
                <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                </p>

              {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && <Trash2 onClick={() => deleteMessage(message.$id)} className='delete--btn' />}
            </div>
            <div className='message--body'>
              <span>{message.body}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </main>
  )
}

export default Room
