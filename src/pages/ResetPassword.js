import styles from './ResetPassword.module.css';
import Main from "../components/utils/Main";
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
import { getCookie, removeCookie } from '../hooks/cookie';
import pwdToken from '../hooks/pwdToken';

function ResetPassword() {
    
    // user_id 가져오기
    const user = localStorage.getItem("find_user");

    // navigate 설정
    const navigate = useNavigate();

    // Ref
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);

    // 메시지
    const [pwdMessage, setPwdMessage] = useState("");
    const [pwd2Message, setPwd2Message] = useState("");

    // 비밀번호 상태 
    const [isPwd, setIsPwd] = useState(false);
    const [isPwd2, setIsPwd2] = useState(false);

    const handleChangePwd = () => {
        const pwdRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{3,20}$/
        const confirm = pwdRegex.test(passwordRef.current.value);
        if (passwordRef.current.value.length < 3 || passwordRef.current.value.length > 20 || !confirm) {
            setPwdMessage('*3~20자의 영문, 숫자와 특수문자의 조합만 가능합니다.');
            setIsPwd(false);
        } else {
            setPwdMessage('');
            setIsPwd(true)
        }
    };

    const handleChangePwd2 = () => {
        if (passwordRef.current.value === password2Ref.current.value) {
            setPwd2Message("");
            setIsPwd2(true);
        } else {
            setPwd2Message('비밀번호가 일치하지 않습니다.');
            setIsPwd2(false);
        }
    };

    // 비밀번호 재설정 버튼 함수
    function onSubmit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/change_password`,
            {
                id: user,
                password: passwordRef.current.value
            }
        )
            .then((res) => {
                pwdToken(user, passwordRef.current.value);
                alert("비밀번호가 변경되었습니다.")
                localStorage.removeItem("find_user");
                navigate("/");
            })
            .catch(res => {
                if (res.response.status === 401) {
                    console.log("토큰이 만료되었습니다");
                }
            });
    };

    return (
        <Main>
            <section className={styles.resetPwdPart}>
                <div className={styles.titlePart}>
                    <Link to="/" className={styles.title}>
                        MEMOME
                    </Link>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit} disabled>
                    <div className={styles.inputBox}>
                        <input id="password" type="password" name="password" placeholder="새 비밀번호 입력" className={styles.resetInput} ref={passwordRef} onChange={handleChangePwd} maxLength='20' />
                        <p className={styles.alert}>{pwdMessage}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input id="password2" type="password" name="password2" placeholder="새 비밀번호 재확인" className={styles.resetInput} ref={password2Ref} onChange={handleChangePwd2} maxLength='20' />
                        <p className={styles.alert}>{pwd2Message}</p>
                    </div>

                    {!(isPwd && isPwd2) ? (
                        <button type="submit" className={styles.disabledButton} disabled >비밀번호 재설정</button>
                    ) : (
                        <button type="submit" className={styles.submitButton}>비밀번호 재설정</button>
                    )}
                </form>
            </section>
        </Main>
    )
}

export default ResetPassword;