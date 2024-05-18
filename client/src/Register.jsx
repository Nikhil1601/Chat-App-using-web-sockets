import { useContext, useState } from "react";
import axios from 'axios';
import { userContext } from "./UserContext";
export default function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const{setusername,setid}=useContext(userContext);
    async function register(){
        event.preventDefault();
       const{data} = await axios.post('/register',{username,password});
       setusername(username);
       setid(data.id);
    }
    return(
        <div className="bg-blue-100 h-screen flex items-center">
            <form className="w-64 mx-auto mb-11" onSubmit={register}>
                <input value={username} onChange={eve => setUsername(eve.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"/>
                <input value={password} onChange={eve => setPassword(eve.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"/>
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">Register</button>
            </form>
        </div>
    );
}