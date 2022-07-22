import styles from "./Comments.module.css";
import axios from 'axios';
import { getCookie } from '../../hooks/cookie';
import deleteComment from './DeleteComment';

function Comments({ comment, page, id }) {
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
                    (getCookie("user_id") === page) ? (
                        <span className={styles.deleteButton} onClick={e => deleteComment(page, id)}>&nbsp; x</span>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Comments;