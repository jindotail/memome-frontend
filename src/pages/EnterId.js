import styles from './EnterId.module.css';
import Main from "../components/utils/Main";
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { setCookie } from '../hooks/cookie';

function EnterId() {

    // 입력값 구해오기
    const idRef = useRef(null);

    //로그인하기 버튼 함수
    async function onSubmit(e) {
        try {
            e.preventDefault();

            const data = {
                id: idRef.current.value
            };

            axios.get(`${process.env.REACT_APP_API_URL}/api/user/${data.id}`)
                .then((res) => {
                    localStorage.setItem("find_user", data.id);
                    window.location.replace(`/findPassword`);
                })
                .catch(res => {
                    console.log('Error!');
                    if (data.id === '') {
                        alert("비밀번호를 찾고자 하는 아이디를 입력하세요.")
                    } else {
                        alert('입력하신 아이디를 찾을 수 없습니다.');
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Main>
            <section className={styles.enterPart}>
                <div className={styles.titlePart}>
                    <Link to="/" className={styles.title}>
                        MEMOME
                    </Link>
                </div>
                <form action="" method="POST" className={styles.fromStyle} onSubmit={onSubmit} disabled>
                    <div className={styles.inputBox}>
                        <input id="username" type="text" name="username" placeholder="비밀번호를 찾고 싶은 아이디를 입력하세요" className={styles.login} ref={idRef} />
                    </div>
                    <button type="submit" className={styles.submitButton}>Check</button>
                </form>
            </section>
        </Main>
    )
}

export default EnterId;