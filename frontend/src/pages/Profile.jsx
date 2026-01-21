import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { user } = useContext(AuthContext);

    return ( <
        div className = "min-h-screen bg-gray-100 p-6" >

        <
        div className = "bg-white p-6 max-w-xl mx-auto rounded-xl shadow" >
        <
        h1 className = "text-4xl font-bold mb-6 text-blue-600" >
        Welcome { user.name }👋 <
        /h1>

        <
        div className = "space-y-3 text-lg" >
        <
        p > < strong > Name: < /strong> {user.name}</p >
        <
        p > < strong > Email: < /strong> {user.email}</p >
        <
        p > < strong > Role: < /strong> {user.role}</p >
        <
        /div> <
        /div>

        <
        /div>
    );
}