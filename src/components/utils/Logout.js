import axios from 'axios';
import { removeCookie } from '../../hooks/cookie';

function Logout(e) {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`
    )
        .then(res => {
            console.log(res);
            removeCookie("user_id");
            removeCookie("refreshToken");
            removeCookie("accessToken");
            console.log("전송 성공");
            window.location.replace(`/`);
        })
        .catch(res => { console.log(res) });
};

export default Logout;