import axios from "axios";

export const sendMessage  = async (message:string)=>{
    const resp = await axios.post('http://185.46.8.130/api/v1/chat/send-message', {message},{ responseType: 'stream' })
    return resp.data;
}