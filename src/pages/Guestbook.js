import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";

function Guestbook() {
    const url = window.location.href;

    // 방명록 주소 복사 함수
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('복사 성공!');
        } catch (error) {
            alert('복사 실패!');
        }
    };
    return (
        <div className={styles.guestbook}>
            <span className={styles.title}> Jindo's Guestbook</span>
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
            {console.log(url)}
            <button className={styles.shareButton} onClick={() => handleCopy(url)}>방명록 공유하기</button>
        </div >

    )
}

export default Guestbook;