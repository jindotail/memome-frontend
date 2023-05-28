import { useRef } from "react";
import styles from "./ChangePwdQnA.module.css";
import userAxios from '../../hooks/getUserInfo';
import { getCookie } from "../../hooks/cookie";
import axios from "axios";
import { token } from "../../hooks/token";

const ChangePwdQnA = () => {

    // 사용자 id 가져오기
    const user = getCookie("user_id");

    // 입력창 값 가져오기 
    const pwdQuestionRef = useRef(null);
    const pwdAnswerRef = useRef(null);

    // 사용자 정보 가져오기
    const userInfo = userAxios(`${process.env.REACT_APP_API_URL}/api/user/${user}/password_question`);
    const passwordQuestion = userInfo.passwordQuestion;
    const passwordAnswer = "";

    // 수정 버튼 클릭 시 
    const onSubmit = (e) => {

        e.preventDefault();
        axios.patch(`${process.env.REACT_APP_API_URL}/api/user/${user}`,
            {
                passwordQuestion: pwdQuestionRef.current.value,
                passwordAnswer: pwdAnswerRef.current.value
            }
        )
            .then((res) => {
                alert("비밀번호 찾기 문답이 변경되었습니다.")
            })
            .catch(res => {
                const userId = { user }
                if (pwdQuestionRef.current.value === '' || pwdAnswerRef.current.value === '' ) {
                    alert("변경할 질문 또는 답변 문구를 입력하세요");
                }
                else if (res.response.status === 401) {
                    console.log("토큰이 만료되었습니다");
                    token(userId, "닉네임");
                }
            });
    };

    return (
        <div className={styles.qnaChangePart}>
            <p className={styles.title}>비밀번호 찾기 문답 변경</p>
            <div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder={passwordQuestion ? passwordQuestion : "질문"}
                        ref={pwdQuestionRef}
                        maxLength="10"
                    />
            
                    <input
                        className={styles.input}
                        placeholder={passwordAnswer ? passwordAnswer : "답변"}
                        ref={pwdAnswerRef}
                        maxLength="10"
                    />
                </div>
                <button className={styles.idButton} onClick={onSubmit}>
                  변경
                </button>
            </div>
        </div>
    );
};

export default ChangePwdQnA;