import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Register({ setShowRegister }) {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    });

    const handleRegister = async() => {
        try {
            const res = await api.post("/api/createuser", form);

            if (res.data.success === true) {
                const u = res.data.user;

                // 🔥 Same as login
                loginUser({
                    userId: u._id,
                    name: u.name,
                    email: u.email,
                    role: u.role
                });

                alert("Registration Successful!");

                // 🔥 Login जैसा redirect
                navigate("/profile");
            } else {
                alert("Registration Failed");
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Server Error");
            }
        }
    };

    return ( <
        div className = "max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg" >
        <
        h2 className = "text-2xl font-bold text-center mb-6" > User Registration < /h2>

        <
        input placeholder = "Name"
        className = "w-full p-2 mb-4 border rounded"
        onChange = {
            (e) => setForm({...form, name: e.target.value })
        }
        />

        <
        input placeholder = "Email"
        className = "w-full p-2 mb-4 border rounded"
        onChange = {
            (e) => setForm({...form, email: e.target.value })
        }
        />

        <
        input placeholder = "Password"
        type = "password"
        className = "w-full p-2 mb-4 border rounded"
        onChange = {
            (e) => setForm({...form, password: e.target.value })
        }
        />

        <
        input placeholder = "Address"
        className = "w-full p-2 mb-4 border rounded"
        onChange = {
            (e) => setForm({...form, address: e.target.value })
        }
        />

        <
        button onClick = { handleRegister }
        className = "w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded" >
        Register <
        /button>

        <
        p className = "text-center mt-4" >
        Already have an account ?
        <
        button className = "text-blue-500 underline ml-1"
        onClick = {
            () => setShowRegister(false)
        } >
        Back to Login <
        /button> < /
        p > <
        /div>
    );
}