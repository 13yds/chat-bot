import { screen } from '../scss/App.module.scss'
import { Message } from './Message';
import { IMessage } from '../interfaces';
type ScreenProps = {
    messages:IMessage[]
}
export const Screen = ({messages}:ScreenProps)=>{
    return(
    <div className={screen}>
       {messages.map((message:IMessage, index:number)=> <Message key={index} {...message}/>)}
    </div>)
}