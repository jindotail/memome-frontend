import styles from "./Readme.module.css";

function Readme () {
    return (
      <div>
        <header>Memome ReadMe</header>
        <section>
          <div>
            <p>Markdown</p>
            <div>
              <p>{/* 마크다운 코드 보여줌 */}</p>
              <button>COPY!</button>
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
        </section>
      </div>
    );
}

export default Readme();