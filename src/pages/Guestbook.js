import styles from "./Guestbook.module.css";

function Guestbook() {
    return (
        <div className={styles.guestbook}>
            <span className={styles.title}> ____'s Guestbook</span>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <div className={styles.comment}>  Volupta si dolor incididunt nulla.</div>
                    <div className={styles.comment}>  Do Lorem reprehenderit qui esse qui pariatur excepteur culpa culpa occaecat. Quis esse fugiat nisi tempor aliquip. Laborum laborum labore velit tempor. Eiusmod sit elit nulla consequat reprehenderit enim voluptate. </div>
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