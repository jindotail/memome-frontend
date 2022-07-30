import axios from 'axios';
import { token } from '../../hooks/token';

// 댓글 삭제 함수
function deleteComment(page, id) {

    // e.preventDefault();
    console.log(page, id)

    axios.delete(`/api/comment/${page}/${id}`)
        .then(res => {
            // handle success
            console.log(res);
            window.location.replace(`/${page}`);
        })
        .catch(error => {
            // handle error
            if (error.response.status === 401) {
                console.log("토큰이 만료되었습니다");
                token(page, id);
            } else {
                console.log(error);
            };
        })
};

export default deleteComment;