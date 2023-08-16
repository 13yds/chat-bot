import { sendMessage } from '../api/api';
import { IMessage } from '../interfaces';
import { fieldWrapper } from '../scss/App.module.scss'
import {useRef, useEffect} from "react"
type IField = {
    handleSend:(message:IMessage)=>void
    refButton: any
}
export const Field =({handleSend, refButton}:IField)=>{
    let ref = useRef<HTMLInputElement>(null);
    const handleClick = async ()=>{
        if(!ref.current) return;
        let value = ref.current.value;
        if(value) {
            handleSend({text:value, type:"user"})
            ref.current.value = "";
            ref.current.focus();
            let stream = await sendMessage(value);
            handleSend({text:stream, type:"bot"});
        }
    }
    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, []);
    return(
    <div className={fieldWrapper} >
        <input type="text" defaultValue="" placeholder={'Start typing here...'} ref={ref}/>
        <button title="Send" onClick={handleClick} ref={refButton}/>   
    </div>
)
}