//회원탈퇴 함수

import axios from 'axios';

export function withdrawal({ user }) {
    axios.delete(`http://localhost:8080/api/user/${user}`)
        .then(res => {
            // handle success
            console.log(res);
            //window.location.replace(`/`);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
}

