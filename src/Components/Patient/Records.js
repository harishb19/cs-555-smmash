import {useState} from "react";

const Records = () => {
    const [records, setRecords] = useState([]);
    return (
        <div>
            <h1>Records</h1>
            <ul>
                {records.map((record) => (
                    <li key={record.id}>
                        <Link to={`/records/${record.id}`}>{record.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
