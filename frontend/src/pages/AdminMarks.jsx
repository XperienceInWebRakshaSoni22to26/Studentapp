import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function AdminMarks() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [marksData, setMarksData] = useState(null);
    const [subjectString, setSubjectString] = useState("");

    const fetchMarks = async() => {
        try {
            const res = await api.get(`/api/admin/marks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMarksData(res.data.marks);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMarks();
    }, []);

    const addMarks = async() => {
        const parts = subjectString.split(":");

        if (parts.length !== 2) {
            alert("Use format: Subject:Marks");
            return;
        }

        const name = parts[0];
        const marks = parts[1];

        try {
            await api.post(
                "/api/addmarks", { subjects: [{ name, marks }] }, { headers: { Authorization: `Bearer ${user.token}` } }
            );

            setSubjectString("");
            fetchMarks();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteMarks = async() => {
        try {
            await api.delete("/api/deletemarks", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchMarks();
        } catch (err) {
            console.log(err);
        }
    };

    return ( <
        div className = "p-6" >
        <
        h1 className = "text-2xl font-bold text-blue-700" > Manage User Marks < /h1>

        {
            marksData ? ( <
                div className = "bg-white p-5 shadow rounded mt-4" >

                { /* User Info */ } <
                h2 className = "text-xl font-semibold" > {
                    marksData.userId && marksData.userId.name ?
                    marksData.userId.name : "No Name"
                } <
                /h2>

                <
                p className = "text-gray-500" > {
                    marksData.userId && marksData.userId.email ?
                    marksData.userId.email : "No Email"
                } <
                /p>

                { /* Subjects List */ } <
                ul className = "mt-4 space-y-2" > {
                    marksData.subjects &&
                    marksData.subjects.map((sub, idx) => ( <
                        li key = { idx }
                        className = "bg-gray-200 p-3 rounded" >
                        <
                        strong > { sub.name } < /strong>: {sub.marks} < /
                        li >
                    ))
                } <
                /ul>

                { /* Add subject */ } <
                input value = { subjectString }
                onChange = {
                    (e) => setSubjectString(e.target.value)
                }
                placeholder = "Math:90"
                className = "border p-2 rounded w-full mt-4" /
                >

                <
                button onClick = { addMarks }
                className = "bg-green-600 text-white px-4 py-2 rounded w-full mt-2" >
                Add Marks <
                /button>

                { /* Delete all subjects */ } <
                button onClick = { deleteMarks }
                className = "bg-red-600 text-white px-4 py-2 rounded w-full mt-4" >
                Delete All Marks <
                /button> < /
                div >
            ) : ( <
                p > Loading... < /p>
            )
        } <
        /div>
    );
}