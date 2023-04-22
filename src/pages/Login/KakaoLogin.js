// 로그인 페이지

import axios from 'axios';
import styles from "./KakaoLogin.module.css"

const KakaoLogIn = () => {
    // 카카오 로그인 함수를 실행시키면 아래에 설정해 놓은 KAKAO_AUTH_URL 주소로 이동한다.
    // 이동 된 창에서 kakao 계정 로그인을 시도할 수 있으며 로그인 버튼 클릭 시 Redirect URI로 이동하면서 빈 화면과 함게 인가코드가 발급된다.(인가코드는 파라미터 값에 들어가 있다!)

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <div className={styles.container}>
            <button className={styles.submitButton} onClick={kakaoLogin}>
                <img src="/img/kakao_login_button.png" />
            </button>
        </div>
    );
};

export default KakaoLogIn;
