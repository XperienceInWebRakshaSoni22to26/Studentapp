import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Marks() {

    const { user } = useContext(AuthContext);
    const [subjectString, setSubjectString] = useState("");
    const [marksData, setMarksData] = useState(null);

    const fetchMarks = async() => {
        try {
            const res = await api.get("/api/getmarks", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMarksData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMarks();
    }, []);

    const addMarks = async() => {
        try {
            const [name, marks] = subjectString.split(":");

            await api.post(
                "/api/addmarks", { subjects: [{ name, marks }] }, { headers: { Authorization: `Bearer ${user.token}` } }
            );

            setSubjectString("");
            fetchMarks();
            alert("Marks added!");
        } catch (err) {
            console.log(err);
        }
    };

    return ( <
        div className = "min-h-screen bg-gray-100 p-6" >

        <
        div className = "bg-white p-6 max-w-xl mx-auto rounded-xl shadow" >
        <
        h1 className = "text-3xl font-bold mb-6 text-green-700" > Your Marks < /h1>

        { /* Only Admin & Superadmin Can Add Marks */ } {
            (user.role === "admin" || user.role === "superadmin") && ( <
                >
                <
                input type = "text"
                placeholder = "Enter subject like Math:90"
                className = "border w-full p-3 rounded mb-3"
                value = { subjectString }
                onChange = {
                    (e) => setSubjectString(e.target.value) }
                />

                <
                button onClick = { addMarks }
                className = "bg-green-600 text-white px-4 py-2 rounded w-full" >
                Add Marks <
                /button> <
                />
            )
        }

        { /* Only Show Marks */ } {
            marksData && marksData.subjects && ( <
                ul className = "mt-4 space-y-2" > {
                    marksData.subjects.map((item, index) => ( <
                        li key = { index }
                        className = "bg-gray-200 p-3 rounded shadow" >
                        <
                        strong > { item.name } < /strong>: {item.marks} <
                        /li>
                    ))
                } <
                /ul>
            )
        } <
        /div>

        <
        /div>
    );
}