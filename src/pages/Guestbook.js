import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";

function Guestbook() {
    return (
        <div className={styles.guestbook}>
            <span className={styles.title}> ____'s Guestbook</span>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <Comments />
                    <Comments />
                </div>
                <div className={styles.inputBox}>
                    <input />
                    <button className={styles.submitButton}>전송</button>
                </div>
            </div>
            <button className={styles.shareButton}>방명록 공유하기</button>
        </div >

    )
}

export default Guestbook;