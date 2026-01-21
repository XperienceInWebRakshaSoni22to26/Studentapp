import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleCreate = async(e) => {
        e.preventDefault();

        try {
            await api.post("/api/createadmin", { name, email, password });

            alert("Admin created successfully");
            navigate("/admins");
        } catch (err) {
            console.log("Error:", err);
        }
    };

    return ( <
        div className = "min-h-screen bg-gray-100 flex items-center justify-center px-4" >
        <
        div className = "bg-white shadow-lg rounded-xl p-8 w-full max-w-md" >
        <
        h2 className = "text-2xl font-semibold text-gray-800 text-center mb-6" >
        Create New Admin <
        /h2>

        <
        form onSubmit = { handleCreate }
        className = "space-y-4" >
        <
        input type = "text"
        placeholder = "Full Name"
        className = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange = {
            (e) => setName(e.target.value) }
        required /
        >

        <
        input type = "email"
        placeholder = "Email Address"
        className = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange = {
            (e) => setEmail(e.target.value) }
        required /
        >

        <
        input type = "password"
        placeholder = "Password"
        className = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange = {
            (e) => setPassword(e.target.value) }
        required /
        >

        <
        button type = "submit"
        className = "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" >
        Create Admin <
        /button> <
        /form> <
        /div> <
        /div>
    );
};

export default CreateAdmin;