import { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import "../../../Style/interviewdetailsimulation.css";

// const API_KEY = "insertyourapikeyhere";

const systemMessage = { 
    "role": "system", "content": "Explain things like you're a job interviewer."
}

type InterviewProps =
{
    interview_prompt: string | undefined; 
}


const Simulation = (props: InterviewProps) => {
    const [messages, setMessages] = useState<any>([
    ]);
    const [isTyping, setIsTyping] = useState(false);
    async function promptInitialization() {
        setIsTyping(true);
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  
                { role: "user", content: `pretend to be an interviewer and ask me questions for a job that uses ${props.interview_prompt}. Don't answer your own questions. let me answer the questions and rate my answers` }// The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...messages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT", 
                    direction: "incoming"
                }]);
                setIsTyping(false);
            });
    }
    useEffect(() => 
        {
            promptInitialization();
        }, []); 
    const handleSend = async (message: any) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages: any) { 


        let apiMessages = chatMessages.map((messageObject: any) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  
                ...apiMessages 
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: "incoming"
                }]);
                setIsTyping(false);
            });
    }

    return (
        <div className="App">
            <div className="interviewContainer" style={{ height: "500px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message: any, i: any) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={(message) => handleSend(message)} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Simulation