import axios from 'axios';
import { removeCookie, setCookie } from './cookie';

export function token(user) {
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
                alert("토큰이 만료되어 로그아웃되었습니다");
                removeCookie("refreshToken");
                removeCookie("accessToken");
                removeCookie("user_id");
                window.location.replace("/");
            } else {
                console.log(error);
            }
        })
}