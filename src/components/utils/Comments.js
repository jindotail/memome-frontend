import styles from "./Comments.module.css";
import axios from 'axios';

function Comments({ comment, page, id }) {
    const date = comment.iso_time;

    // 댓글 삭제 함수
    //util로 옮기기
    function deleteComment(e) {
        e.preventDefault();

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


    return (
        <div className={styles.container}>
            <div className={styles.comment}>
                <span>
                    {comment.comment}
                </span>
                <span></span>
            </div>
            <div className={styles.date}>
                {date.substr(0, 10)}
                {
                    (document.cookie.user_id === page) ? (
                        <span className={styles.deleteButton} onClick={deleteComment}>&nbsp; x</span>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Comments;