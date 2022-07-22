//회원탈퇴 함수

import axios from 'axios';
import { removeCookie } from '../../hooks/cookie';
import { token } from '../../hooks/token';

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