import { useContext, useState, useEffect } from 'react'
import { userAuthContext } from '@/context/userAuthContext'
import { getUsers, sendMessage, getMessages } from '@/repository/chat.service'
import { MessageCircle, Send } from 'lucide-react'

// Components
import { Card } from '@/components/ui/card'

interface User {
  uid: string
  userName: string
  photoURL: string
}

interface Message {
  senderId: string
  text: string
  timestamp: number
}

const Direct = () => {
  const { user } = useContext(userAuthContext)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Fetch users from backend
    getUsers().then(setUsers)
  }, [])

  useEffect(() => {
    if (selectedUser) {
      getMessages(user!.uid, selectedUser.uid).then(setMessages)
    }
  }, [selectedUser])

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const message = { senderId: user!.uid, text: newMessage, timestamp: Date.now() }
      setMessages([...messages, message])
      setNewMessage('')
      await sendMessage(user!.uid, selectedUser.uid, message)
    }
  }

  return (
    <div className='flex h-screen bg-gray-900 text-white'>
      {/* User List */}
      <div className='w-1/4 p-4 border-r border-gray-800'>
        <h2 className='mb-4 text-lg font-semibold'>Chats</h2>
        <ul>
          {users.map((u) => (
            <li
              key={u.uid}
              className={`flex items-center p-3 cursor-pointer rounded-lg transition-all ${
                selectedUser?.uid === u.uid ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
              onClick={() => setSelectedUser(u)}
            >
              <img src={u.photoURL} className='h-10 w-10 rounded-full mr-3' />
              <span>{u.userName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className='flex flex-col flex-1'>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className='p-4 border-b border-gray-800 flex items-center'>
              <img src={selectedUser.photoURL} className='h-10 w-10 rounded-full mr-3' />
              <h2 className='text-lg font-semibold'>{selectedUser.userName}</h2>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.senderId === user!.uid ? 'bg-blue-600 self-end ml-auto' : 'bg-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className='p-4 border-t border-gray-800 flex items-center'>
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder='Type a message...'
                className='flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none'
              />
              <button onClick={handleSendMessage} className='ml-3 p-2 rounded-full bg-blue-600 hover:bg-blue-700'>
                <Send className='text-white' />
              </button>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center flex-1 text-gray-400'>Select a user to start chatting</div>
        )}
      </div>
    </div>
  )
}

export default Direct
