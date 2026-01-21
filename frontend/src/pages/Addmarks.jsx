import React, { useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const AddMarks = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await api.post("/api/addmarks", {
                userId: id,
                subjects: [{ name: subject, marks: Number(marks) }],
            });

            alert("Marks added successfully!");
            navigate("/users");

        } catch (err) {
            console.log("Error adding marks:", err);
        }
    };

    return ( <
        div className = "min-h-screen flex items-center justify-center bg-gray-100" >
        <
        div className = "bg-white shadow-lg p-8 rounded-xl w-full max-w-md" >
        <
        h2 className = "text-xl font-semibold text-center mb-6" > Add Marks < /h2>

        <
        form onSubmit = { handleSubmit }
        className = "space-y-4" >

        <
        input type = "text"
        placeholder = "Subject Name"
        className = "w-full px-4 py-3 border rounded-lg"
        value = { subject }
        onChange = {
            (e) => setSubject(e.target.value) }
        required /
        >

        <
        input type = "number"
        placeholder = "Marks"
        className = "w-full px-4 py-3 border rounded-lg"
        value = { marks }
        onChange = {
            (e) => setMarks(e.target.value) }
        required /
        >

        <
        button type = "submit"
        className = "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700" >
        Submit <
        /button> <
        /form> <
        /div> <
        /div>
    );
};

export default AddMarks;