//회원탈퇴 함수

import axios from 'axios';
import { removeCookie, setCookie } from '../../hooks/cookie';

function token(user) {
    axios.post('/api/auth/token', {
        id: user
    })
        .then(res => {
            //handle success
            const { accessToken } = res.data;
            setCookie("accessToken", accessToken);
        })
        .catch(error => {
            if (error.response.status === 401) {
                console.log("RefreshToken이 만료되었습니다");
            } else {
                console.log(error);
            }
        })
}

export function withdrawal(user) {
    axios.delete(`/api/user/${user}`)
        .then(res => {
            // handle success
            console.log(res);
            removeCookie("user_id");
            window.location.replace(`/`);
            alert("탈퇴되었습니다")
        })
        .catch(error => {
            // handle error
            if (error.response.status === 401) {
                console.log("토큰이 만료되었습니다");
                token(user);
            } else {
                console.log(error);
            };
        })
}