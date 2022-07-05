import styles from "./Main.module.css";
import useAxios from '../../hooks/randomAxios';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

function Main({ children }) {
    const users = useAxios(`http://localhost:8080/api/user/random?count=5`);

    return (
        <div className={styles.main}>
            <section className={styles.imagePart}>
                <div className={styles.container}>
                    {
                        (sessionStorage.length > 0) ? (
                            <div className={styles.contents}>
                                <div className={styles.chatContainer}>
                                    <div className={styles.comment}>다른 유저들의 방명록에 방문해보세요!</div>
                                </div>
                                {users.map(user => (
                                    <Link to={`/${user}`}>
                                        <div className={styles.chatContainer}>
                                            <div className={styles.recommendComment}>
                                                <div className={styles.homeIcon}>
                                                    {/* 동그라미 만들어서 안에 아이콘 집어넣기 */}
                                                    <AiOutlineHome size="24" color='#ffffff9b' />
                                                </div>
                                                <div className={styles.userInfo}>
                                                    {user} 님의 <br />방명록 방문가기
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
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
                        )
                    }

                    <form className={styles.inputChatBox}>
                        <input className={styles.input} type="text" disabled />
                        <button className={styles.chatButton}>전송</button>
                    </form>
                </div>
            </section >
            {children}
        </div >
    )
}

export default Main;