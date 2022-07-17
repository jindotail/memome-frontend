import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Login.module.css";
import { Cookies } from 'react-cookie';
import { setCookie } from '../hooks/cookie';

function Login() {

    //로그인하기 버튼 함수
    async function onSubmit(e) {
        try {

            e.preventDefault();
            const data = {
                id: idRef.current.value,
                password: passwordRef.current.value,
            }

            console.log(data);

            axios.post(`http://localhost:8080/api/auth/login`,
                data,
                {
                    headers: {
                        "Content-Type": `application/json`,
                        "Access-Control-Allow-Origin": `http://localhost:3000`,
                        withCredentials: true,
                        credenitals: true,
                    },
                }
            )
                .then((res) => {
                    const { token } = res.data;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setCookie("user_id", data.id);
                    window.location.replace(`/${data.id}`);
                })
                .catch(res => {
                    console.log('Error!');
                    alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
                });
        } catch (e) {
            console.log(e);
        }
    };

    const idRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <Main>
            {(document.cookie.length > 0) ? (
                <section className={styles.enterPart}>
                    <div className={styles.titlePart}>
                        <div className={styles.title}>
                            MEMOME
                        </div>
                    </div>
                    <Link to={`/${sessionStorage.user_id}`} className={styles.enterButton}>내 방명록으로 가기</Link>
                </section>
            ) : (
                <section className={styles.loginPart}>
                    <div className={styles.titlePart}>
                        <div className={styles.title}>
                            MEMOME
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
            )}
        </Main>
    )
}

export default Login;