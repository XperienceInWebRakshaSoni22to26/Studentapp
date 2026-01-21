import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);

    if (!user) return null;

    return ( <
        nav className = "w-full bg-gray-800 text-white px-6 py-4 shadow-md flex items-center justify-between" >

        { /* LEFT: Show User Name + Email */ } <
        div className = "text-lg font-semibold" > { user.name } <
        span className = "text-sm text-gray-300 ml-2" > ({ user.email }) < /span> < /
        div >

        { /* NAVIGATION LINKS */ } <
        div className = "space-x-6 text-sm font-medium flex items-center" >

        { /* USER NAVBAR */ } {
            user.role === "user" && ( <
                >
                <
                Link className = "hover:text-yellow-300 transition"
                to = "/profile" > Profile < /Link> <
                Link className = "hover:text-yellow-300 transition"
                to = "/marks" > Marks < /Link> <
                Link className = "hover:text-yellow-300 transition"
                to = "/result" > Result < /Link> <
                Link className = "hover:text-yellow-300 transition"
                to = "/notice" > Notice < /Link> < / >
            )
        }

        { /* ADMIN NAVBAR */ } {
            user.role === "admin" && ( <
                >
                <
                Link className = "hover:text-blue-300 transition"
                to = "/users" > Users < /Link> <
                Link className = "hover:text-blue-300 transition"
                to = "/attendance" > Attendance < /Link> < / >
            )
        }

        { /* SUPERADMIN NAVBAR */ } {
            user.role === "superadmin" && ( <
                >
                <
                Link className = "hover:text-pink-300 transition"
                to = "/users" > Users < /Link> <
                Link className = "hover:text-pink-300 transition"
                to = "/admins" > Admins < /Link> < / >
            )
        }

        { /* LOGOUT BUTTON */ } <
        button onClick = { logoutUser }
        className = "ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition" >
        Logout <
        /button> < /
        div > <
        /nav>
    );
}