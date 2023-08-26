import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../UserContext";

export default function LoginPage(){
    const navigate = useNavigate();
    const [userName,setUserName] = useState('');
    const [pass,setPassword] = useState('');
    const [role,setRole] = useState('');
    const {user,setUser} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userName && pass && role){
            const data = {
              username: userName,
              password: pass,
              role,
            }
            const { success, message, token } = await Login(data);
            if(success){
                localStorage.setItem('token', JSON.stringify(token));
                const obj = {
                    userName:userName,
                    role:role                    
                }
                localStorage.setItem('user', JSON.stringify(obj));
                console.log(obj);
                setUser(obj);
                console.log(user);
                handleSuccess(message);
                navigate('/');
            }
            else{
                handleError(message);
            }
            setUserName('');
            setPassword('');
            setRole('');
        }
    }

    const handleError = (err) =>
        toast.error(err, {
        position: "bottom-left",
    });
    const handleSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-left",
    });

    return (
        <div className="mt-20 flex items-center justify-center">
            <div className="form_container">
                <h2>Login Account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="email">User Name</label>
                    <input
                        type="text"
                        name="text"
                        value={userName}
                        placeholder="Enter your email"
                        onChange={(ev)=>setUserName(ev.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={pass}
                        placeholder="Enter your password"
                        onChange={(ev)=>setPassword(ev.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="radio"
                        name="role"
                        value='Admin'
                        checked={role === 'Admin'}
                        id="Admin"
                        onChange={(ev)=>setRole(ev.target.value)}
                    />
                    <label for="admin">Admin</label>
                    <input
                        type="radio"
                        name="role"
                        value='MO'
                        checked={role === 'MO'}
                        id="MO"
                        onChange={(ev)=>setRole(ev.target.value)}
                    />
                    <label for="MO">Medical Officer</label>
                    <input
                        type="radio"
                        name="role"
                        value='Lab_O'
                        checked={role === 'Lab_O'}
                        id="Lab_O"
                        onChange={(ev)=>setRole(ev.target.value)}
                    />
                    <label for="Lab_O">Lab Officer</label>
                    <input
                        type="radio"
                        name="role"
                        value='Hospital_O'
                        checked={role === 'Hospital_O'}
                        id="Hospital_O"
                        onChange={(ev)=>setRole(ev.target.value)}
                    />
                    <label for="Hospital_O">Hospital Officer</label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}