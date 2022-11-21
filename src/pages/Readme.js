import { useRef, useState } from 'react';
import Menu from '../components/utils/Menu';
import { getCookie } from '../hooks/cookie';
import styles from "./Readme.module.css";

function Readme () {  
    const userId = getCookie("user_id");

    const idRef = useRef(null);

    const [id, setId] = useState(userId);

    const onSubmit = () => {
      setId(idRef.current.value);
    }

    // markdown 복사
    let text = `[![Memome Profile](https://memome-readme.herokuapp.com/v1/layout/${id})](https://memome.be/${id})`
  
    const handleCopy = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        alert("복사 성공!");
      } catch (error) {
        alert("복사 실패!");
      }
    };

    return (
      <div>
        <header className={styles.header}>
          Memome ReadMe
          {/* {(document.cookie.length > 0)?(  
            <div className={styles.menu}>
              <Menu user={userId} />
            </div>
          ):null} */}
        </header>
        <section className={styles.container}>
          <div className={styles.main}>
            <div>
              <p className={styles.title}>ID 입력</p>
              <div>
                <input className={styles.input} placeholder={userId} ref={idRef} />
                <button className={styles.idButton} onClick={onSubmit}>입력</button>
              </div>
            </div> 
            <br />
            <div>
              <p className={styles.title}>Markdown</p>
              <div className={styles.markdown}>
                <p id="readme">
                  {/* 마크다운 코드 보여줌 */}
                  [![Memome Profile](https://memome-readme.be/v1/layout/{id})](https://memome.be/{id})
                </p>
                <div className={styles.copyButtonContainer}>
                  <button className={styles.copyButton} onClick={() => handleCopy(text)}>복사</button>
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
      </div>
    );
}

export default Readme;