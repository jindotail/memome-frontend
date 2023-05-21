import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/utils/Header';
import SelectTheme from '../../components/utils/SelectTheme';
import { getCookie, removeCookie } from '../../hooks/cookie';
import styles from "./Readme.module.css";
import { AiOutlineHome } from "react-icons/ai";

function Readme () {  
    const userId = getCookie("user_id");
    const [signup, setSignup] = useState(false);

    const idRef = useRef(null);

    const [id, setId] = useState(userId);

    // 회원가입 직후 아이디 가져오기
    const signup_id = getCookie("user_id");

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
        <Header userId={userId} />
        <header className={styles.header}>
          Memome ReadMe
        </header>
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
            ) : null}

            {/* 테마 적용 파트 */}
            <SelectTheme />

            {!signup ? (
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
            ):null}

            <div>
              <p className={styles.title}>Markdown</p>
              <div className={styles.markdown}>
                {/* 회원가입 직후와 아닐 경우 분기 처리 */}
                {id ? (
                  <p id="readme">
                    {/* 마크다운 코드 보여줌 */}
                    [![Memome Profile](https://readme.memome.be/v1/{id}
                    )](https://memome.be/{id})
                  </p>
                ) : (
                  <p id="readme">
                    {/* 마크다운 코드 보여줌 */}
                    [![Memome Profile](https://readme.memome.be/v1/{signup_id}
                    )](https://memome.be/{signup_id})
                  </p>
                )}
                
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
            <AiOutlineHome size="24" /> &nbsp; 내 페이지로
          </Link>
        </section>
      </div>
    );
}

export default Readme;