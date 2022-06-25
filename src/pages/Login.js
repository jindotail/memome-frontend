import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Login.module.css";

function Login() {
    return (
        <Main>
            <form action="" method="POST" className={styles.fromStyle}>
                <div className={styles.inputBox}>
                    <input id="username" type="text" name="username" placeholder="아이디" className={styles.login} />
                </div>
                <div className={styles.inputBox}>
                    <input id="password" type="password" name="password" placeholder="비밀번호" className={styles.login} />
                </div>
                <Link to="" className={styles.signIn}>회원가입 하기</Link>
                <button type="submit" className={styles.submitButton}>Log In</button>
            </form>
        </Main>
    )
}

export default Login;