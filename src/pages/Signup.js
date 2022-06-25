import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Signup.module.css";

function Signup() {
    return (
        <Main>
            <section className={styles.signupPart}>
                <div className={styles.titlePart}>
                    <div className={styles.title}>
                        Guest Book
                    </div>
                </div>
                <form action="" method="POST" className={styles.fromStyle}>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="닉네임" className={styles.singup} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="아이디" className={styles.singup} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="비밀번호" className={styles.singup} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="password" type="password" name="password" placeholder="비밀번호 확인" className={styles.singup} />
                    </div>
                    <Link to="/" className={styles.login}>로그인 하기</Link>
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                </form>
            </section>
        </Main>
    )
}

export default Signup;