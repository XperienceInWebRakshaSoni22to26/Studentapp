import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login({ setShowRegister }) {
    const { loginUser } = useContext(AuthContext);

    const [roleTab, setRoleTab] = useState("User"); // UI only
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        try {
            const res = await api.post("/api/loginuser", { email, password });

            loginUser(res.data); // 🔥 correct way
            localStorage.setItem("token", res.data.token);
            console.log(localStorage.getItem("token"));

            alert("Login Successful!");

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Login Failed!");
            }
        }
    };
    return ( <
        div className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-600 p-4" >

        <
        div className = "bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl" >

        <
        h2 className = "text-center text-3xl font-semibold text-gray-800" > Login < /h2> <
        p className = "text-center text-gray-500 text-sm mb-6" > Sign in to
        continue < /p>

        { /* Role Tabs UI only */ } <
        div className = "flex bg-gray-200 rounded-xl p-1 mb-6" > {
            ["Admin", "User", "SuperAdmin"].map((r) => ( <
                button key = { r }
                onClick = {
                    () => setRoleTab(r)
                }
                className = { `w-1/3 py-2 rounded-xl font-medium ${
                                roleTab === r ? "bg-teal-500 text-white" : "text-gray-600"
                            }` } > { r } <
                /button>
            ))
        } <
        /div>

        <
        label className = "text-sm text-gray-600" > Email Address < /label> <
        div className = "bg-gray-100 p-3 rounded-xl shadow-sm mb-4" >
        <
        input type = "email"
        placeholder = "Enter email"
        onChange = {
            (e) => setEmail(e.target.value)
        }
        className = "bg-transparent w-full outline-none" /
        >
        <
        /div>

        <
        label className = "text-sm text-gray-600" > Password < /label> <
        div className = "bg-gray-100 p-3 rounded-xl shadow-sm mb-6" >
        <
        input type = "password"
        placeholder = "Enter password"
        onChange = {
            (e) => setPassword(e.target.value)
        }
        className = "bg-transparent w-full outline-none" /
        >
        <
        /div>

        <
        button onClick = { handleLogin }
        className = "w-full bg-teal-500 text-white py-3 rounded-xl" >
        Login <
        /button>

        { /* Only user can register */ } {
            roleTab === "User" && ( <
                p className = "text-center mt-4 text-gray-700 text-sm" >
                Not registered ? { " " } <
                button className = "text-teal-500 underline"
                onClick = {
                    () => setShowRegister(true)
                } >
                Register Here <
                /button> < /
                p >
            )
        } <
        /div> < /
        div >
    );
}