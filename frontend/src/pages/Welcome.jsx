import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Welcome() {
    const { user } = useContext(AuthContext);

    return ( <
        div className = "min-h-screen bg-gray-100 flex items-center justify-center" >
        <
        h1 className = "text-4xl font-bold" >
        Welcome { user.name } <
        /h1> <
        /div>
    );
}