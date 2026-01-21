import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function UserList() {

    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const res = await api.get("/api/getallusers", {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        setUsers(res.data.data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return ( <
        div className = "p-6" >
        <
        h2 className = "text-2xl font-bold mb-4" > All Users < /h2>

        <
        table className = "w-full border" >
        <
        thead >
        <
        tr className = "bg-gray-300" >
        <
        th className = "p-2" > Name < /th> <
        th className = "p-2" > Email < /th> <
        th className = "p-2" > Role < /th> <
        /tr> <
        /thead>

        <
        tbody > {
            users.map((u) => ( <
                tr key = { u._id }
                className = "border" >
                <
                td className = "p-2" > { u.name } < /td> <
                td className = "p-2" > { u.email } < /td> <
                td className = "p-2" > { u.role } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table>

        <
        /div>
    );
}