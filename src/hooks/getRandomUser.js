// axios로 random user의 데이터 정보 가져오는 파일

import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAxios(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                const data = res.data.users;
                setData(data);
            })
            .catch(error => { console.log(Error) });
    }, [url]);
    return data;
}
