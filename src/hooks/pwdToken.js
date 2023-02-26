import axios from 'axios';
import { getCookie, removeCookie } from './cookie';

export default function pwdToken(id, password) {

    const data = {
        id: id,
        password: password,
    }
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/change_password`,
        data,
        {
            header: {
                'Authorization': getCookie("passwordToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        }
    )
        .then((res) => {
            removeCookie("passwordToken");
        })
        .catch(res => {
            alert(res);
        });

}