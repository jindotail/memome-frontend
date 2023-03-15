import styles from './Profile.module.css';
import Main from "../components/utils/Main";
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { getCookie } from '../hooks/cookie';
import userAxios from '../hooks/getUserInfo';
import axios from 'axios';
import { token } from '../hooks/token';

function Profile() {

    // 사용자 id 가져오기
    const user = getCookie("user_id");

    // 닉네임 입력창 값 가져오기 
    const nicknameRef = useRef(null);

    // 사용자 정보 가져오기
    const userInfo = userAxios(`${process.env.REACT_APP_API_URL}/api/user/${user}`);
    const id = userInfo.id;
    const prevNickname = userInfo.nickname;

    // 수정 버튼 클릭 시 
    const onSubmit = (e) => {

        e.preventDefault();
        axios.patch(`${process.env.REACT_APP_API_URL}/api/user/${user}`,
            {
                nickname: nicknameRef.current.value
            }
        )
            .then((res) => {
                alert("닉네임이 변경되었습니다.")
                window.location.replace(`/profile`);
            })
            .catch(res => {
                const userId = { user }
                if (nicknameRef.current.value === '') {
                    alert("변경하고 싶은 닉네임을 입력하세요");
                    window.location.replace(`/profile`);
                }
                else if (res.response.status === 401) {
                    console.log("토큰이 만료되었습니다");
                    token(userId, "닉네임변경");
                }
            });
    };


    return (
        <Main>
            <section className={styles.profilePart}>
                <div className={styles.titlePart}>
                    <Link to="/" className={styles.title}>
                        MEMOME
                    </Link>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit} disabled>
                    <div className={styles.inputBox}>
                        <p>아이디</p>
                        <input id="id" type="text" name="id" value={id} className={styles.profileInputBox} disabled />
                    </div>
                    <div className={styles.inputBox}>
                        <p>닉네임</p>
                        <input id="nickname" type="text" name="nickname" placeholder={prevNickname} className={styles.profileInputBox} maxLength='10' ref={nicknameRef} />
                    </div>
                    <button type="submit" className={styles.submitButton}>수정</button>
                </form>
            </section>
        </Main>
    )
}

export default Profile;