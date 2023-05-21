import styles from "./Main.module.css";
import useAxios from '../../hooks/getRandomUser';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { getCookie } from "../../hooks/cookie";
import Header from "./Header";
import { currentTime } from "../common/common";

function Main({ children }) {
    const users = useAxios(`${process.env.REACT_APP_API_URL}/api/user/random?count=3`);
    const userId = getCookie("user_id");
    const url = window.location.href.split("3000/")[1];


    console.log(url)
    return (
        <div className={styles.main}>
            {
                (url || userId)? (
                    <Header userId={userId}/>
                ) : null
            }
            <section className={styles.imagePart}>
                <div className={styles.container}>
                    {
                        (userId) ? (
                            <>
                                <div className={styles.contentsLogin}>
                                    <div className={styles.chatContainerLogin}>
                                        <div className={styles.comment}>다른 유저들의 방명록에 방문해보세요!</div>
                                    </div>
                                    {users.map(user => (
                                        <Link to={`/${user.id}`} key={user.idx}>
                                            <div className={styles.chatContainerLogin}>
                                                <div className={styles.recommendComment}>
                                                    <div className={styles.homeIcon}>
                                                        {/* 동그라미 만들어서 안에 아이콘 집어넣기 */}
                                                        <AiOutlineHome size="24" color='#ffffff9b' />
                                                    </div>
                                                    <div className={styles.userInfo}>
                                                        {user.id} 님의 <br />방명록 방문가기
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <form className={styles.inputChatBoxLogin}>
                                    <input className={styles.input} type="text" disabled />
                                    <button className={styles.chatButton} disabled>전송</button>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className={styles.contents}>

                                    <div className={styles.chatContainer}>
                                        <div className={styles.comment}>안녕하세요 MEMOME입니다!</div>
                                        <div className={styles.date}>{currentTime()}</div>
                                    </div>
                                    <div className={styles.chatContainer}>
                                        <div className={styles.comment}>나만의 방명록을 만들어봐요</div>
                                        <div className={styles.date}>{currentTime()}</div>
                                    </div>
                                    <div className={styles.chatContainer}>
                                        <div className={styles.comment}>깃허브 ReadMe에도 추가할 수 있어요!</div>
                                        <div className={styles.date}>{currentTime()}</div>
                                    </div>
                                    {/* <div className={styles.chatContainer}>
                                        <div className={styles.comment}>함께 쓰면 더 행복한 MEMOME</div>
                                        <div className={styles.date}>2022-07-03</div>
                                    </div>
                                    <div className={styles.chatContainer}>
                                        <div className={styles.comment}>같이 즐겨봐요~!</div>
                                        <div className={styles.date}>2022-07-03</div>
                                    </div> */}
                                </div>
                                <form className={styles.inputChatBox}>
                                    <input className={styles.input} type="text" disabled />
                                    <button className={styles.chatButton} disabled>전송</button>
                                </form>
                            </>
                        )
                    }
                </div>
            </section >
            {children}
        </div >
    )
}

export default Main;