import styles from './Profile.module.css';
import Main from "../components/utils/Main";
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { getCookie } from '../hooks/cookie';
import userAxios from '../hooks/getUserInfo';
import axios from 'axios';
import { token } from '../hooks/token';
import SelectTheme from '../components/utils/SelectTheme';
import Header from '../components/utils/Header';
import { AiOutlineHome } from "react-icons/ai";

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
            })
            .catch(res => {
                const userId = { user }
                if (nicknameRef.current.value === '') {
                    alert("변경하고 싶은 닉네임을 입력하세요");
                }
                else if (res.response.status === 401) {
                    console.log("토큰이 만료되었습니다");
                    token(userId, "닉네임변경");
                }
            });
    };


    return (
      <div>
        <Header userId={user} />
        <header className={styles.header}>My Profile </header>
        <section className={styles.container}>
            <div className={styles.nicknamePart}>
                <p className={styles.title}>닉네임 수정</p>
                <div>
                    <input
                      className={styles.input}
                      placeholder={prevNickname}
                      ref={nicknameRef}
                      maxLength="10"
                    />
                    <button className={styles.idButton} onClick={onSubmit}>
                      수정
                    </button>
                </div>
            </div>
            <SelectTheme />
        </section>

        <section className={styles.buttonSection}>
          <Link to={`/${getCookie("user_id")}`} className={styles.enterButton}>
            <AiOutlineHome size="24" /> &nbsp; 내 페이지로
          </Link>
        </section>
      </div>
    );  
}   

export default Profile;