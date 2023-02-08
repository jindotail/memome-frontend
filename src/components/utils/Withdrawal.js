//회원탈퇴 함수

import axios from 'axios';
import { removeCookie } from '../../hooks/cookie';
import { token } from '../../hooks/token';

export function withdrawal(user) {
    const result = confirm("정말 회원탈퇴를 하시겠습니까?");

    if(result) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/user/${user}`)
          .then((res) => {
            // handle success
            console.log(res);
            removeCookie("user_id");
            window.location.replace(`/`);
            alert("탈퇴되었습니다");
          })
          .catch((error) => {
            const userInfo = { user };
            // handle error
            if (error.response.status === 401) {
              console.log("토큰이 만료되었습니다");
              token(userInfo, "회원탈퇴");
              //withdrawal(user);
            } else {
              console.log(error);
            }
          });
    } else {
        return;
    }
    
}