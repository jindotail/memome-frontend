import styles from './FindPassword.module.css';
import Main from "../components/utils/Main";
import { Link } from 'react-router-dom';

function FindPassword() {
    const onSubmit = () => {
        return;
    }
    return (
        <Main>
            <section className={styles.findPwdPart}>
                <div className={styles.titlePart}>
                    <Link to="/" className={styles.title}>
                        MEMOME
                    </Link>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit} disabled>
                    <div className={styles.inputBox}>
                        <section className={styles.questionBox}>
                            <div className={styles.questionContenets}>Q. 나의 강아지 이름은?</div>
                        </section>
                        <input id="answer" type="text" name="answer" placeholder="답을 입력하세요" className={styles.findPwdInputBox} maxLength='10' />
                    </div>

                    <button type="submit" className={styles.submitButton}>Check</button>
                    {/* {!(isId && isName && isPwd && isPwd2 && isPwdQuestion && isPwdAnswer) ? (
                        <button type="submit" className={styles.disabledButton} disabled >Sign Up</button>
                    ) : (
                        <button type="submit" className={styles.submitButton}>Sign Up</button>
                    )} */}
                </form>
            </section>
        </Main>
    )
}

export default FindPassword;