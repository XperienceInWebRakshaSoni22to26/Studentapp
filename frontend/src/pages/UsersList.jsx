import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async() => {
        try {
            const res = await api.get("/api/getallusers");
            setUsers(res.data.data);
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    return ( <
        div className = "p-8" >
        <
        h2 className = "text-2xl font-bold mb-6" > All Users < /h2>

        <
        div className = "overflow-x-auto" >
        <
        table className = "min-w-full bg-white shadow-md rounded-xl overflow-hidden" >
        <
        thead >
        <
        tr className = "bg-gray-200 text-gray-700" >
        <
        th className = "py-3 px-4 text-left" > Name < /th> <
        th className = "py-3 px-4 text-left" > Email < /th> <
        th className = "py-3 px-4 text-center" > Actions < /th> < /
        tr > <
        /thead>

        <
        tbody > {
            users.map((u) => ( <
                tr key = { u._id }
                className = "border-b hover:bg-gray-100" >
                <
                td className = "py-3 px-4" > { u.name } < /td> <
                td className = "py-3 px-4" > { u.email } < /td>

                <
                td className = "py-3 px-4 text-center space-x-2" >
                <
                button onClick = {
                    () => navigate(`/marks/add/${u._id}`)
                }
                className = "bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" >
                Add Marks <
                /button>

                <
                button onClick = {
                    () => navigate(`/marks/view/${u._id}`)
                }
                className = "bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" >
                View Marks <
                /button>

                <
                button onClick = {
                    () => navigate(`/marks/update/${u._id}`)
                }
                className = "bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" >
                Update Marks <
                /button>

                <
                button onClick = {
                    () => navigate(`/marks/delete/${u._id}`)
                }
                className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" >
                Delete Marks <
                /button> < /
                td > <
                /tr>
            ))
        } <
        /tbody> < /
        table > <
        /div>

        <
        /div>
    );
};

export default UserList;