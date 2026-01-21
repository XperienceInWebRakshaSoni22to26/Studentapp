import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList.jsx";
import UserList from "./pages/UserList.jsx";
import CreateAdmin from "./pages/CreateAdmin";
import EditAdmin from "./pages/EditAdmin";
import Profile from "./pages/Profile";
import Marks from "./pages/Marks";
import Welcome from "./pages/Welcome";
import AdminMarks from "./pages/AdminMarks";
import UsersList from "./pages/UsersList";
import AddMarks from "./pages/Addmarks";
import UpdateMarks from "./pages/UpdateMarks";
import DeleteMarks from "./pages/DeleteMarks";
import ViewMarks from "./pages/ViewMarks";

export default function App() {
    const { user } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);

    if (!user) {
        return showRegister ? ( <
            Register setShowRegister = { setShowRegister }
            />
        ) : ( <
            Login setShowRegister = { setShowRegister }
            />
        );
    }

    return ( <
        >
        <
        Navbar / >

        <
        Routes > { /* USER ROUTES */ } {
            user.role === "user" && ( <
                >
                <
                Route path = "/"
                element = { < Welcome / > }
                /> <
                Route path = "/profile"
                element = { < Profile / > }
                /> <
                Route path = "/marks"
                element = { < Marks / > }
                /> <
                Route path = "/result"
                element = { < Welcome / > }
                /> <
                Route path = "/notice"
                element = { < Welcome / > }
                /> < / >
            )
        }

        {
            user.role === "admin" && ( <
                >
                <
                Route path = "/users"
                element = { < UsersList / > }
                />

                <
                Route path = "/marks/add/:id"
                element = { < AddMarks / > }
                /> <
                Route path = "/marks/view/:id"
                element = { < ViewMarks / > }
                /> <
                Route path = "/marks/update/:id"
                element = { < UpdateMarks / > }
                /> <
                Route path = "/marks/delete/:id"
                element = { < DeleteMarks / > }
                /> < / >
            )
        }


        { /* SUPERADMIN ROUTES */ } {
            user.role === "superadmin" && ( <
                >
                <
                Route path = "/dashboard"
                element = { < SuperAdminDashboard / > }
                /> <
                Route path = "/admins"
                element = { < AdminList / > }
                />

                { /* ADD THESE TWO ROUTES */ } <
                Route path = "/create-admin"
                element = { < CreateAdmin / > }
                /> <
                Route path = "/edit-admin/:id"
                element = { < EditAdmin / > }
                />

                <
                Route path = "/users"
                element = { < UserList / > }
                /> < / >
            )
        } <
        /Routes> < / >
    );
}