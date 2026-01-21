import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

const ViewMarks = () => {
    const { id } = useParams();
    const [marks, setMarks] = useState(null);

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async() => {
        try {
            const res = await api.get(`/api/admin/marks/${id}`);
            setMarks(res.data.marks);
        } catch (err) {
            console.log("Error fetching marks:", err);
        }
    };

    return ( <
        div className = "p-8" >
        <
        h2 className = "text-2xl font-semibold mb-6" > User Marks < /h2>

        {
            !marks ? ( <
                p > No marks found < /p>
            ) : ( <
                table className = "min-w-full bg-white shadow-md rounded-lg" >
                <
                thead >
                <
                tr className = "bg-gray-200" >
                <
                th className = "px-4 py-3" > Subject < /th> <
                th className = "px-4 py-3" > Marks < /th> <
                /tr> <
                /thead>

                <
                tbody > {
                    marks.subjects.map((sub, i) => ( <
                        tr key = { i }
                        className = "border-b" >
                        <
                        td className = "px-4 py-3" > { sub.name } < /td> <
                        td className = "px-4 py-3" > { sub.marks } < /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table>
            )
        } <
        /div>
    );
};

export default ViewMarks;