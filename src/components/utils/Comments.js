import styles from "./Comments.module.css";
import { getCookie } from '../../hooks/cookie';
import axios from 'axios';
import { token } from '../../hooks/token';
import Loading from './Loading';
import { useState } from 'react';

function Comments({ comment, page, id }) {
    const date = comment.iso_time;
    const [loading, setLoading] = useState(false);
    
    // 댓글 삭제 함수
    const deleteComment = async(user, id) => {
        setLoading(true); 

            await axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/${user}/${id}`)
            .then(res => {
                // handle success
                setLoading(false); 
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

    return (
        <div className={styles.container}>

            {/* 로딩중일 때 화면 */}
            {loading ? <Loading /> : null} 
            
            <div className={styles.comment}>
                <span>
                    {comment.comment}
                </span>
                <span></span>
            </div>
            <div className={styles.date}>
                {date.substr(0, 10)}
                {
                    (getCookie("user_id") === page) ? (
                        <span className={styles.deleteButton} onClick={e => deleteComment(page, id)}>&nbsp; x</span>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Comments;