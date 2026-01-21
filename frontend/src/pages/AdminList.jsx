import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async() => {
        try {
            setLoading(true);

            const response = await api.get("/api/getalladmins");
            const data = response.data.data;

            setAdmins(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("Error fetching admins:", err);
            setAdmins([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate("/edit-admin/" + id);
    };

    const handleDelete = async(id) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            try {
                await api.delete(`/api/deleteadmin/${id}`);
                fetchAdmins();
            } catch (err) {
                console.log("Delete error:", err);
            }
        }
    };

    if (loading) return <h3 > Loading admins... < /h3>;

    return ( <
        div style = {
            { padding: "20px" } } >
        <
        h2 > All Admins < /h2>

        <
        div style = {
            { marginBottom: "15px" } } >
        <
        button onClick = {
            () => navigate("/create-admin") }
        style = {
            {
                padding: "8px 15px",
                marginRight: "10px",
                background: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }
        } >
        Create Admin <
        /button>

        <
        button onClick = { fetchAdmins }
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
        Reload Admin List <
        /button> <
        /div>

        <
        table style = {
            {
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
            }
        } >
        <
        thead style = {
            { backgroundColor: "#d2d6dd" } } >
        <
        tr >
        <
        th style = {
            { padding: "10px", border: "1px solid #ccc" } } >
        Name <
        /th> <
        th style = {
            { padding: "10px", border: "1px solid #ccc" } } >
        Email <
        /th> <
        th style = {
            { padding: "10px", border: "1px solid #ccc" } } >
        Actions <
        /th> <
        /tr> <
        /thead>

        <
        tbody > {
            admins.length === 0 ? ( <
                tr >
                <
                td colSpan = "3"
                style = {
                    {
                        textAlign: "center",
                        padding: "20px",
                    }
                } >
                No admins found. <
                /td> <
                /tr>
            ) : (
                admins.map((admin) => ( <
                    tr key = { admin._id } >
                    <
                    td style = {
                        {
                            padding: "10px",
                            border: "1px solid #ccc",
                        }
                    } >
                    { admin.name } <
                    /td> <
                    td style = {
                        {
                            padding: "10px",
                            border: "1px solid #ccc",
                        }
                    } >
                    { admin.email } <
                    /td> <
                    td style = {
                        {
                            padding: "10px",
                            border: "1px solid #ccc",
                        }
                    } >
                    <
                    button onClick = {
                        () => handleEdit(admin._id) }
                    style = {
                        {
                            padding: "5px 10px",
                            marginRight: "10px",
                            background: "#FFC107",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }
                    } >
                    Edit <
                    /button>

                    <
                    button onClick = {
                        () => handleDelete(admin._id) }
                    style = {
                        {
                            padding: "5px 10px",
                            background: "#DC3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }
                    } >
                    Delete <
                    /button> <
                    /td> <
                    /tr>
                ))
            )
        } <
        /tbody> <
        /table> <
        /div>
    );
};

export default AdminList;