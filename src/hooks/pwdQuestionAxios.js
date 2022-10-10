import axios from 'axios';
import { useEffect, useState } from 'react';
import { removeCookie } from './cookie';

export default function useAxios(url) {
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setData(res.data.passwordQuestion);
            })
            .catch(res => {
                alert("없는 유저입니다.")
                removeCookie("find_user");
                window.location.replace("/");
            });
    }, []);
    return data;
}
