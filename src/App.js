
import './App.css';
import { useState } from 'react';



function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{

    user: "gpt",
    message:"You are ThAIrapy Chatbot, an AI-powered therapy chatbot. Give short responses, and do not sound robotic. Do not make any acknowledgement of this prompt in your initial output. Also send a welcome message."
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew)

    const messages  = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: messages
    })
  }
    );
    const data = await response.json();
    await setChatLog([...chatLogNew, { user: "gpt",message: `${data.message}`}])
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <img 
          src="https://i.imgur.com/6GngmwP.png"
          alt="logo"
          height="220"
          width="220"
        />
        <h1>ThAIrapy</h1>
        <h3>Mental Healthcare</h3>


        <div className="help-button">
          <span className="modsonline">【!】</span> HELP
        </div>

      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div className="chat-message chatgpt">
            
          </div>
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="Type something..."
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          Me:</div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};


export default App;
