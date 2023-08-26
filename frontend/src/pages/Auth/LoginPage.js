import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { Login } from "../services/api";

export default function LoginPage(){
    // const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [pass,setPassword] = useState('');
    const [role,setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email && pass && role){
            const data = {
              email: email,
              password: pass,
              role,
            }
            const { success, message, token } = await Login(data);
            setEmail('');
            setPassword('');
            setRole('');
        }
    }

    return (
        <div className="mt-20 flex items-center justify-center">
            <div className="form_container">
                <h2>Login Account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev)=>setEmail(ev.target.value)}
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
                        value='admin'
                        checked={role === 'admin'}
                        id="admin"
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
                {/* <ToastContainer /> */}
            </div>
        </div>
    );
}