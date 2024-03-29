import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../../components/utils/Main';
import styles from "./Login.module.css";
import { getCookie, setCookie } from '../../hooks/cookie';
import userAxios from '../../hooks/getNickname';

function Login() {
    
    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const userId = getCookie("user_id");

    // 닉네임 가져오기
    const nickname = userAxios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);

    //로그인하기 버튼 함수
    async function onSubmit(e) {
        try {
            e.preventDefault();
            const data = {
                id: idRef.current.value,
                password: passwordRef.current.value,
            }

            axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
                data,
                {
                    header: {
                        'Authorization': getCookie("accessToken"),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': true
                    },
                }
            )
                .then((res) => {
                    setCookie("user_id", data.id);
                    window.location.replace(`/${data.id}`);
                })
                .catch(res => {
                    console.log('Error!');
                    if (data.id === '') {
                        alert("아이디를 입력하세요")
                    } else if (data.password === '') {
                        alert("비밀번호를 입력하세요")
                    } else {
                        alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Main>
            {(userId) ? (
                <section className={styles.enterPart}>
                    <div className={styles.titlePart}>
                        <Link to="/" className={styles.title}>
                            MEMOME
                        </Link>
                    </div>
                    <div className={styles.greeting}>{nickname}님 안녕하세요!</div>
                    <Link to={`/${getCookie("user_id")}`} className={styles.enterButton}>내 방명록으로 가기</Link>
                </section>
            ) : (
                <section className={styles.loginPart}>
                    <div className={styles.titlePart}>
                        <Link to="/" className={styles.title}>
                            MEMOME
                        </Link>
                    </div>
                    <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit}>
                        <div className={styles.inputBox}>
                            <input id="username" type="text" name="username" placeholder="아이디" className={styles.login} ref={idRef} />
                        </div>
                        <div className={styles.inputBox}>
                            <input id="password" type="password" name="password" placeholder="비밀번호" className={styles.login} ref={passwordRef} />
                        </div>
                        <Link to="/enterId" className={styles.findPassword}>비밀번호 찾기</Link>
                        <Link to="/signup" className={styles.signIn}>회원가입 &nbsp; </Link>
                        
                        <div className={styles.inputBox}>
                            <button type="submit" className={styles.submitButton}>Log In</button>
                        </div>
                    </form>
                </section>
            )}
        </Main>
    )
}
export default Login;