// 실시간으로 comment 추가되는 기능 유지시 삭제 예정 파일

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAxios(url) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
            .then(res => {
                return res.data.body;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(Error);
                alert("존재하지 않는 방명록입니다.")
                navigate('/');
            });
    }, [url]);

    return data;
}
