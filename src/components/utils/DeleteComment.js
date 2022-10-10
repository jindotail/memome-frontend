import axios from 'axios';
import { removeCookie } from '../../hooks/cookie';
import { token } from '../../hooks/token';

// 댓글 삭제 함수
function deleteComment(user, id) {

    // e.preventDefault();

    axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/${user}/${id}`)
        .then(res => {
            // handle success
            console.log(res);
            window.location.replace(`/${user}`);
        })
        .catch(error => {
            // handle error
            console.log(error)
            const userInfo = { user, id }
            if (error.response.status === 401) {
                console.log("토큰이 만료되었습니다");
                token(userInfo, "댓글삭제");
            } else {
                console.log(error);
            };
        })
};

export default deleteComment;