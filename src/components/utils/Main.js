import styles from "./Main.module.css";

function Main({ children }) {
    return (
        <div className={styles.main}>
            <section className={styles.imagePart}>
                <div className={styles.container}>
                    <div className={styles.contents}>
                        <div className={styles.chatContainer}>
                            <div className={styles.comment}>안녕하세요~!</div>
                            <div className={styles.date}>2022-07-01</div>
                        </div>
                        <div className={styles.chatContainer}>
                            <div className={styles.comment}>하이하이</div>
                            <div className={styles.date}>2022-07-02</div>
                        </div>
                        <div className={styles.chatContainer}>
                            <div className={styles.comment}>남은 2022년도 파이팅! 할 수 있다~!</div>
                            <div className={styles.date}>2022-07-03</div>
                        </div>
                        <div className={styles.chatContainer}>
                            <div className={styles.comment}>이렇게 방명록을 써요</div>
                            <div className={styles.date}>2022-07-03</div>
                        </div>
                        <div className={styles.chatContainer}>
                            <div className={styles.comment}>참 쉽죠??</div>
                            <div className={styles.date}>2022-07-03</div>
                        </div>
                    </div>
                    <form className={styles.inputChatBox}>
                        <input className={styles.input} type="text" disabled />
                        <button className={styles.chatButton}>전송</button>
                    </form>
                </div>
            </section>

            <section className={styles.loginPart}>
                <div className={styles.titlePart}>
                    <div className={styles.title}>
                        Guest Book
                    </div>
                </div>
                <form action="" method="POST" className={styles.loginForm}>
                    {children}
                </form>
            </section>
        </div >
    )
}

export default Main;