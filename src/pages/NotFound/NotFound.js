import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={styles.main}>
            <div className={styles.number}>
                404
            </div>

            <div className={styles.text}>
                존재하지 않는 페이지 입니다.
            </div>
        </div>
    )
}

export default NotFound;