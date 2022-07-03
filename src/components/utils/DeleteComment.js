import axios from 'axios';

// 댓글 삭제 함수
function deleteComment({ page, id }) {

    // e.preventDefault();

    axios.delete(`http://localhost:8080/api/comment/${page}/${id}`)
        .then(res => {
            // handle success
            console.log(res);
            window.location.replace(`/${page}`);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
};

export default deleteComment;