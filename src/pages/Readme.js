import styles from "./Readme.module.css";

function Readme () {
    return (
      <div>
        <header className={styles.header}>Memome ReadMe</header>
        <section className={styles.container}>
          <div className={styles.main}>
            <div>
              <p>Markdown</p>
              <div className={styles.markdown}>
                <p>
                  {/* 마크다운 코드 보여줌 */}{" "}
                  [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fgjbae1212%2Fhit-counter)](https://hits.seeyoufarm.com){" "}
                </p>
                <button className={styles.copyButton}>COPY!</button>
              </div>
            </div>
            <div>
              <p>사용 방법</p>
              <div>{/* 이미지 및 설명 방법  */}</div>
            </div>
            <div>
              <p>Demo</p>
              <div>{/* Version 1  */}</div>
              <div>{/* Version 2  */}</div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Readme;