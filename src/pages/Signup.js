import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Signup.module.css";

function Signup() {

    // 가입하기 버튼 함수
    function onSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/auth/signup`,
            {
                id: idRef.current.value,
                password: passwordRef.current.value,
                nickname: nicknameRef.current.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(res => {
                console.log("전송 성공");
                alert('가입에 성공하셨습니다!');
                window.location.replace(`/`);
            })
            .catch(res => {
                console.log('Error!')
                alert('이미 가입된 아이디입니다.');
            });
    };

    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const nicknameRef = useRef(null);

    return (
        <Main>
            <section className={styles.signupPart}>
                <div className={styles.titlePart}>
                    <div className={styles.title}>
                        Guest Book
                    </div>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit}>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="닉네임" className={styles.singup} ref={nicknameRef} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="아이디" className={styles.singup} ref={idRef} />
                    </div>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="비밀번호" className={styles.singup} ref={passwordRef} />
                    </div>
                    {/* <div className={styles.inputBox}>
                        <input id="password" type="password" name="password" placeholder="비밀번호 확인" className={styles.singup} />
                    </div> */}
                    <Link to="/" className={styles.login}>로그인 하기</Link>
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                </form>
            </section>
        </Main>
    )
}

export default Signup;