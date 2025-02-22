import { useState, useEffect, useContext } from "react";
import { userAuthContext } from "@/context/UserAuthContext";
import { getUsers } from "@/repository/user.service";
import { getMessages, sendMessage } from "@/repository/chat.service";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Direct = () => {
  const { user } = useContext(userAuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getMessages(user.uid, selectedUser.uid, setMessages);
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (!selectedUser || !selectedUser.uid) {
      console.error("❌ Selected user is undefined or missing UID. Please select a user before sending a message.");
      return;
    }
  
    if (!newMessage.trim()) return;
  
    sendMessage(user.uid, selectedUser.uid, newMessage)
      .catch(err => console.error("Error sending message:", err));
  
    setNewMessage("");
  };
  
  

  return (
    <div className="flex h-screen">
      {/* User List Sidebar */}
      <aside className="w-1/3 border-r p-4">
        <h2 className="mb-4 text-lg font-semibold">Users</h2>
        {users.map((u) => (
          <div key={u.uid} className="flex items-center p-2 cursor-pointer hover:bg-gray-200" onClick={() => setSelectedUser(u)}>
            <img src={u.photoURL || "/avatar.png"} className="w-10 h-10 rounded-full" />
            <span className="ml-2">{u.displayName}</span>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <section className="flex flex-col w-2/3">
        {selectedUser ? (
          <>
            <CardHeader className="p-4 border-b">
              Chat with {selectedUser.displayName}
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-2 p-2 rounded-lg ${msg.senderId === user.uid ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"}`}>
                  {msg.text}
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t flex">
              <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1" placeholder="Type a message..." />
              <Button onClick={handleSendMessage} className="ml-2">Send</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">Select a user to start chatting</div>
        )}
      </section>
    </div>
  );
};

export default Direct;
