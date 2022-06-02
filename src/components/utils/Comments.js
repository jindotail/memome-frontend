import styles from "./Comments.module.css";

function Comments({ comment }) {
    const date = comment.iso_time;
    return (
        <div className={styles.container}>
            <div className={styles.comment}>{comment.comment}</div>
            <div className={styles.date}>{date.substr(0, 10)}</div>
        </div>
    )
}

export default Comments;