import axios from 'axios';
import deleteComment from '../components/utils/DeleteComment';
import { withdrawal } from '../components/utils/Withdrawal';
import { removeCookie, setCookie } from './cookie';

export function token(user, type) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/token`, {
        id: user.user
    })
        .then(res => {
            //handle success
            const { accessToken } = res.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            removeCookie("accessToken");
            setCookie("accessToken", accessToken);

            if (type === "회원탈퇴") {
                console.log("회원탈퇴 들어옴")
                withdrawal(user.user);
            }
            else if (type === "닉네임" || type === "테마") {
                alert(`다시 ${type} 변경을 시도하세요.`);
                window.location.replace("/profile");
            }
            else {
                console.log("댓글삭제 들어옴")
                deleteComment(user.user, user.id);
            }
        })
        .catch(error => {
            if (error.response.status === 401) {
                console.log("RefreshToken이 만료되었습니다");
                alert("장시간 사용이 없어 로그아웃되었습니다.");
                removeCookie("refreshToken");
                removeCookie("accessToken");
                removeCookie("user_id");
                window.location.replace("/");
            } else {
                console.log(error);
            }
        })
}