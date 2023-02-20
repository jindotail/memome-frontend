import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/utils/Header';
import Menu from '../components/utils/Menu';
import { getCookie, removeCookie } from '../hooks/cookie';
import styles from "./Readme.module.css";

function Readme () {  
    const userId = getCookie("user_id");
    const [signup, setSignup] = useState(false);

    const idRef = useRef(null);

    const [id, setId] = useState(userId);

    const onSubmit = () => {
      setId(idRef.current.value);
    }

    // markdown 복사
    let text = `[![Memome Profile](https://readme.memome.be/v1/${id})](https://memome.be/${id})`
  
    const handleCopy = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        alert("복사 성공!");
      } catch (error) {
        alert("복사 실패!");
      }
    };

    useEffect(()=>{
      let signupYN = getCookie("finishSignup");

      if(signupYN) {
        setSignup(true);
      }

      return() =>{
        removeCookie("finishSignup");
      }
        
    },[]);

    return (
      <div>
        <Header />
        <header className={styles.header}>Memome ReadMe</header>
        <section className={styles.container}>
          <div className={styles.main}>
            {signup ? (
              <>
                <h1>🥳회원가입을 환영합니다</h1>
                <p>
                  <b>아래 링크를 복사해서 README에 방명록을 추가해보세요!</b>
                </p>
                <br />
              </>
            ) : (
              <>
                <div>
                  <p className={styles.title}>ID 입력</p>
                  <div>
                    <input
                      className={styles.input}
                      placeholder={userId}
                      ref={idRef}
                    />
                    <button className={styles.idButton} onClick={onSubmit}>
                      입력
                    </button>
                  </div>
                </div>
                <br />
              </>
            )}

            {/* 테마 적용 파트 */}
            <section>
              <p className={styles.title}>Theme</p>
              <div>
                <div>테마 내용</div>
                <div>테마 이름</div>
                <button>적용</button>
              </div>
            </section>

            <div>
              <p className={styles.title}>Markdown</p>
              <div className={styles.markdown}>
                <p id="readme">
                  {/* 마크다운 코드 보여줌 */}
                  [![Memome Profile](https://readme.memome.be/v1/{id}
                  )](https://memome.be/{id})
                </p>
                <div className={styles.copyButtonContainer}>
                  <button
                    className={styles.copyButton}
                    onClick={() => handleCopy(text)}
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div>
              <p className={styles.title}>Demo</p>
              <div className={styles.demoContainer}>
                <div className={styles.demo}>
                  <p className={styles.demoTitle}>{id}의 방명록</p>
                  <div className={styles.demoSubTitle}>Recent comments</div>
                  <div className={styles.comments}>안녕하세요</div>
                  <div className={styles.comments}>{id}의 방명록입니다~!</div>
                  <div className={styles.logoContainer}>
                    <div className={styles.logo}>MEMOME</div>
                  </div>
                </div>
                <div>{/* Version 2  */}</div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.buttonSection}>
          <Link to={`/${getCookie("user_id")}`} className={styles.enterButton}>
            내 방명록으로 가기
          </Link>
        </section>
      </div>
    );
}

export default Readme;