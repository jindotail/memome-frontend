import styles from "./Comments.module.css";

function Comments() {
    return (
        <div className={styles.container}>
            <div className={styles.comment}>안녕하세요~!</div>
            <div className={styles.date}>2022-05-26</div>
        </div>
    )
}

export default Comments;