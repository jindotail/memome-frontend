import axios from 'axios';
import { removeCookie } from '../../hooks/cookie';

function Logout(e) {
    e.preventDefault();

    axios.post(`/api/auth/logout`,
        {
            headers: {
                "Content-Type": "application/json",
                withCredentials: true
            }
        }
    )
        .then(res => {
            console.log(res);
            removeCookie("user_id");
            console.log("전송 성공");
            window.location.replace(`/guest-book-frontend`);
        })
        .catch(res => { console.log(res) });
};

export default Logout;