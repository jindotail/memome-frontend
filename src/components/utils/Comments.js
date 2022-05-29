import styles from "./Comments.module.css";

function Comments({ comment }) {
    return (
        <div className={styles.container}>
            <div className={styles.comment}>{comment.comment}</div>
            <div className={styles.date}>{comment.date}</div>
        </div>
    )
}

export default Comments;