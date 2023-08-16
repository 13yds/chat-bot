import { botMessage, userMessage} from '../scss/App.module.scss'
import { IMessage } from '../interfaces'
import { useEffect, useState } from 'react';

export const Message = ({type,text}:IMessage)=>{
   let [message, setMessage] = useState("")
   let [reading, setReading] = useState(true);
    useEffect(()=>{ 
        if(type === "bot") {
            let reader: ReadableStreamDefaultReader| null = new ReadableStream().getReader();
            async function readStream()
            {
                let readableStream = new ReadableStream(
                {
                    async start(controller) 
                    {
                        let result = "";
                        for (const data of text)
                        {
                            if(data === "{") result = data;
                            else result += data;
                            if(data === "}")
                            {
                                let obj= JSON.parse(result);
                                if(obj.status === "done") {
                                    controller.close();
                                    break;
                                }
                                controller.enqueue(obj.value);
                            }
                        }
                    }
                });
                reader = readableStream.getReader();
                let newMessage = message;
                while (reading && reader)
                {
                    const { done, value } = await reader.read();
                    if (done) break;
                    await new Promise(resolve=>{
                        setTimeout(resolve, 100)
                        newMessage += value;
                        setMessage(newMessage)
                    })
                }
            }
            if (reading ) readStream();
            else if (reader) {
                reader.cancel();
            }
            return () => {
                if (reader) reader.cancel(); 
            };
        }
    }, [text, reading])
    return<>
         {type === "user" ? 
            <div className={userMessage}>
                <span>{text}</span>
                <i/>
            </div>
            :
            <div className={botMessage}>
                <i/>
                <span>{message}</span>
                <button title="Stop" onClick={()=> reading ? setReading(!reading) : null}/>
            </div>
        }
    </>
}