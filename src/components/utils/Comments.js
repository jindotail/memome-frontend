import styles from "./Comments.module.css";
import { getCookie } from '../../hooks/cookie';
import axios from 'axios';
import { token } from '../../hooks/token';
import Loading from './Loading';
import { useState } from 'react';
import { useSelector } from "react-redux";

function Comments({ comment, page, id, themeData, owner }) {
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

    // 임시 owner 뱐수 설정
    // const owner = false;

    return (
        <div className={owner ? styles.ownerContainer: styles.container}>
            { owner ? (
                <span className={styles.ownerDate}>
                    {
                        (getCookie("user_id") === page) ? (
                            <span className={styles.deleteButton} onClick={e => deleteComment(page, id)}>&nbsp; x</span>
                        ) : null
                    }
                    {date.substr(0, 10)}
                </span>): null
            }

            <div className={styles.comment}
                style={{
                    background: `linear-gradient(${themeData.commentColor.start} 0%, ${themeData.commentColor.end} 100%)`
                }}   
            >
                <span>
                    {comment.comment}
                </span>
                <span></span>
            </div>

            { !owner ? (
                <div className={styles.date}>
                    {date.substr(0, 10)}
                    {
                        (getCookie("user_id") === page) ? (
                            <span className={styles.deleteButton} onClick={e => deleteComment(page, id)}>&nbsp; x</span>
                        ) : null
                    }
                </div>): null
            }
            
            {/* 로딩중일 때 화면 */}
            {loading ? <Loading /> : null} 
        </div>
    )
}

export default Comments;