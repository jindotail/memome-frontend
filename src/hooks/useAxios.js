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
            .catch(error => { console.log(Error) });
    }, [url]);

    return data;
}
