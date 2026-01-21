import React, { useEffect } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const DeleteMarks = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        handleDelete();
    }, []);

    const handleDelete = async() => {
        try {
            await api.delete(`/api/deletemarks/${id}`);
            alert("Marks deleted successfully!");
            navigate("/users");
        } catch (err) {
            console.log("Error deleting marks:", err);
        }
    };

    return <p > Deleting Marks... < /p>;
};

export default DeleteMarks;