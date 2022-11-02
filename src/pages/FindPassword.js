import styles from './FindPassword.module.css';
import Main from "../components/utils/Main";
import { Link } from 'react-router-dom';
import { getCookie } from '../hooks/cookie';
import axios from 'axios';
import { useRef } from 'react';
import pwdQuestionAxios from '../hooks/pwdQuestionAxios';

function FindPassword() {

    const find_user = localStorage.getItem("find_user");
    const question = pwdQuestionAxios(`${process.env.REACT_APP_API_URL}/api/user/${find_user}/password_question`);
    const answerRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/${find_user}/password_question`,
            {
                passwordAnswer: answerRef.current.value
            }
        )
            .then(res => {
                window.location.replace(`/resetPassword`);
                //removeCookie("find_user");
            })
            .catch(res => {
                alert("틀린 답변입니다.")
                answerRef.current.value = "";
                window.location.replace(`/findPassword`);
            });
    };


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
                            <div className={styles.questionContenets}>Q. {question}</div>
                        </section>
                        <input id="answer" type="text" name="answer" placeholder="답을 입력하세요" className={styles.findPwdInputBox} maxLength='10' ref={answerRef} />
                    </div>

                    <button type="submit" className={styles.submitButton}>Check</button>
                </form>
            </section>
        </Main>
    )
}

export default FindPassword;