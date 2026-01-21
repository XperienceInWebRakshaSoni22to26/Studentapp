import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const EditAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const fetchAdminDetails = async() => {
        try {
            const response = await api.get("/api/getalladmins");
            const admins = response.data.data;

            const found = admins.find((a) => a._id === id);

            if (found) {
                setAdmin({
                    name: found.name,
                    email: found.email,
                    password: "",
                });
            }
        } catch (err) {
            console.log("Error fetching admin:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            await api.put(`/api/updateadmin/${id}`, admin);

            alert("Admin updated successfully!");
            navigate("/admins");
        } catch (err) {
            console.log("Update error:", err);
            alert("Failed to update admin.");
        }
    };

    if (loading) return <h3 > Loading admin details... < /h3>;

    return ( <
        div style = {
            { padding: "20px" } } >
        <
        h2 > Edit Admin < /h2>

        <
        form onSubmit = { handleUpdate }
        style = {
            { maxWidth: "350px" } } >
        <
        label > Name: < /label> <
        input type = "text"
        value = { admin.name }
        onChange = {
            (e) =>
            setAdmin({...admin, name: e.target.value })
        }
        required /
        >
        <
        br / > < br / >

        <
        label > Email: < /label> <
        input type = "email"
        value = { admin.email }
        onChange = {
            (e) =>
            setAdmin({...admin, email: e.target.value })
        }
        required /
        >
        <
        br / > < br / >

        <
        label > New Password(optional): < /label> <
        input type = "password"
        placeholder = "Enter new password"
        onChange = {
            (e) =>
            setAdmin({...admin, password: e.target.value })
        }
        /> <
        br / > < br / >

        <
        button type = "submit"
        style = {
            {
                padding: "8px 15px",
                background: "#28A745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }
        } >
        Update Admin <
        /button> <
        /form> <
        /div>
    );
};

export default EditAdmin;