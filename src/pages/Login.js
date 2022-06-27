import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Login.module.css";
import { setCookie } from '../hooks/cookie';

function Login() {
    // 가입하기 버튼 함수
    function onSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/auth/login`,
            {
                id: idRef.current.value,
                password: passwordRef.current.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true
                }

            }
        )
            .then(res => {
                console.log("로그인 성공");
                setCookie("user_id", `${idRef.current.value}`);
                setCookie("user_pw", `${passwordRef.current.value}`);
                window.location.replace((`/${idRef.current.value}`));
            })
            .catch(res => {
                console.log('Error!');
                alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
            });
    };

    const idRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <Main>
            <section className={styles.loginPart}>
                <div className={styles.titlePart}>
                    <div className={styles.title}>
                        Guest Book
                    </div>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit}>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="아이디" className={styles.login} ref={idRef} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="password" type="password" name="password" placeholder="비밀번호" className={styles.login} ref={passwordRef} />
                    </div>
                    <Link to="/signup" className={styles.signIn}>회원가입 하기</Link>
                    <button type="submit" className={styles.submitButton}>Log In</button>
                </form>
            </section>
        </Main>
    )
}

export default Login;