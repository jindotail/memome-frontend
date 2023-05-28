import { useSelector } from "react-redux";
import Header from "../../components/utils/Header";
import { getCookie } from "../../hooks/cookie";
import styles from "./Version.module.css";

function Version () {
    
    const userId = getCookie("user_id");

    // 테마색상 가져오기
    const themeColor = useSelector((state) => state.theme.themeColor);

    return(
        <div>
            <div>
                <Header userId={userId}/>
                <header className={styles.header}>
                    About Memome 
                </header>
            </div>
            <section className={styles.container}>
            <div className={styles.main}>
                <div>
                <div className={styles.title}>Developers</div>
                <div className={styles.profileContainer}>
                    <div className={styles.profileItem}>
                        <img src="/img/profile_ksm.png" alt="" className={styles.profileImg}/>
                        <div className={styles.profileName}>김수민</div>
                        <div className={styles.profileWork}>Frontend Developer</div>
                    </div>
                    <div className={styles.profileItem}>
                        <img src="/img/profile_psm.png" alt="" className={styles.profileImg}/>
                        <div className={styles.profileName}>박성민</div>
                        <div className={styles.profileWork}>Backend Developer</div>
                    </div>
                </div>
                <hr />
                <div className={styles.versionContainer}>
                    <p className={styles.title}>Version</p>
                    <p className={styles.versionTitle}>v 1.2.0</p>

                    <li>오렌지 테마색상 변경</li>
                    <li>비밀번호 찾기 질문 답변 수정기능 추가</li>
                    <li>방명록 소유자 댓글 오른쪽 표시</li>
                    <p className={styles.versionTitle}>v 1.1.0</p>
                    <li>테마 선택 기능 추가</li>
                    <p className={styles.versionTitle}>v 1.0.0</p>
                    <li>메모미 탄생🥳</li>
                </div>
                </div> 
                <br />
            </div>
            </section>
        </div>
    )
}

export default Version;