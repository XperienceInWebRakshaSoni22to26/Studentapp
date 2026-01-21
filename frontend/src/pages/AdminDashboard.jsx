import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        api.get("/api/getallusers", {
            headers: { Authorization: `Bearer ${user.token}` }
        }).then(res => setAllUsers(res.data.data));
    }, []);

    return ( <
        div className = "p-6" >
        <
        h2 className = "text-3xl font-bold" > Admin Dashboard < /h2> <
        h3 className = "mt-4 text-xl" > All Users: < /h3>

        <
        div className = "mt-4 space-y-3" > {
            allUsers.map((u) => ( <
                div key = { u._id }
                className = "p-3 bg-white shadow rounded flex justify-between" >
                <
                div >
                <
                p className = "font-semibold" > { u.name } < /p> <
                p className = "text-gray-600" > { u.email } < /p> < /
                div >

                <
                a href = { `/marks/${u._id}` }
                className = "bg-blue-600 text-white px-3 py-1 rounded" >
                View Marks <
                /a> < /
                div >
            ))
        } <
        /div> < /
        div >
    );
}