import { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../components/utils/Main';
import styles from "./Signup.module.css";

function Signup() {
    const idRef = useRef(null);
    const nicknameRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);

    // 메시지 
    const [nameMessage, setNameMessage] = useState("");
    const [idMessage, setIdMessage] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");
    const [pwd2Message, setPwd2Message] = useState("");

    const [isName, setIsName] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isPwd2, setIsPwd2] = useState(false);

    //유효성 확인
    const handleChangeName = () => {
        if (nicknameRef.current.value.length < 1 || nicknameRef.current.value.length > 10) {
            setNameMessage('*최소 1자에서 최대 10자까지 가능합니다.')
            setIsName(false)
        } else {
            setNameMessage('');
            setIsName(true);
        }
    };
    const handleChangeId = () => {
        const idRegex = /[!@#$%^*+=-\d.\d,\d/]/;
        const confirm = idRegex.test(idRef.current.value);
        if (idRef.current.value.length < 3 || idRef.current.value.length > 10 || confirm) {
            setIdMessage('*3~10자의 영문과 숫자만 사용 가능합니다.');
            setIsId(false);
        } else {
            setIdMessage('');
            setIsId(true);
        }
    };
    const handleChangePwd = () => {
        const pwdRegex = /^(?=.*[a-z])(?=.*[0-9]).{3,20}$/
        const confirm = pwdRegex.test(passwordRef.current.value);
        if (passwordRef.current.value.length < 3 || passwordRef.current.value.length > 20 || !confirm) {
            setPwdMessage('*3~20자의 영문과 숫자의 조합만 가능합니다.');
            setIsPwd(false);
        } else {
            setPwdMessage('');
            setIsPwd(true)
        }
    }
    const handleChangePwd2 = () => {
        if (passwordRef.current.value === password2Ref.current.value) {
            setPwd2Message("");
            setIsPwd2(true);
        } else {
            setPwd2Message('비밀번호가 일치하지 않습니다.');
            setIsPwd(false);
        }
    }

    // 가입하기 버튼 함수
    function onSubmit(e) {
        e.preventDefault();
        const data = {
            id: idRef.current.value,
            password: passwordRef.current.value,
            nickname: nicknameRef.current.value,
        }

        axios.post(`/api/auth/signup`,
            data,
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
                if (data.id === '') {
                    alert("아이디를 입력하세요")
                } else if (data.password === '') {
                    alert("비밀번호를 입력하세요")
                } else if (data.nickname === '') {
                    alert("닉네임을 입력하세요")
                } else if (password2Ref.current.value === '') {
                    alert("비밀번호 확인을 입력하세요")
                } else {
                    alert('이미 가입된 아이디입니다.');
                }
            });
    };

    return (
        <Main>
            <section className={styles.signupPart}>
                <div className={styles.titlePart}>
                    <Link to="/" className={styles.title}>
                        MEMOME
                    </Link>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit} disabled>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="닉네임" className={styles.singup} ref={nicknameRef} onChange={handleChangeName} maxLength='10' />
                        <p className={styles.alert}>{nameMessage}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input id="id" type="text" name="username" placeholder="아이디" className={styles.singup} ref={idRef} onChange={handleChangeId} maxLength='10' />
                        <p className={styles.alert}>{idMessage}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input id="password" type="password" name="password" placeholder="비밀번호" className={styles.singup} ref={passwordRef} onChange={handleChangePwd} maxLength='20' />
                        <p className={styles.alert}>{pwdMessage}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input id="password2" type="password" name="password2" placeholder="비밀번호 재확인" className={styles.singup} ref={password2Ref} onChange={handleChangePwd2} maxLength='20' />
                        <p className={styles.alert}>{pwd2Message}</p>
                    </div>
                    <Link to="/" className={styles.login}>로그인 하기</Link>
                    {!(isId && isName && isPwd && isPwd2) ? (
                        <button type="submit" className={styles.disabledButton} disabled={!(isId)}>Sign Up</button>
                    ) : (
                        <button type="submit" className={styles.submitButton}>Sign Up</button>
                    )}
                </form>
            </section>
        </Main>
    )
}

export default Signup;