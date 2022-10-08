import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAxios(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                return res.data.body;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                const errorCode = "notFound";
                return errorCode;
            });
    }, [url]);

    return data;
}
