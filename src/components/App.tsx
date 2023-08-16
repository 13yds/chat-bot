import { app } from '../scss/App.module.scss'
import { Screen } from './Screen';
import {Field} from "./Field"
import {useState, useCallback, useRef} from "react"
import { IMessage } from '../interfaces';

export const App = ()=> {
  const [messages, useMessage] = useState<IMessage []>([])
  const refButton = useRef();
  const handleSend = useCallback(((message:IMessage)=>{
    useMessage(prev => [...prev, message])
  }), [messages, useMessage])
  return (
  <div className={app}>
    <main>
      <h1>Bot Chat</h1>
      <h2>AI-based service</h2>
      <Screen messages={messages}/>
      <Field handleSend={handleSend} refButton={refButton}/>
    </main>
  </div>
  )
}
