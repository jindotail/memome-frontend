import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
// import Custom from '../components/utils/Custom';
import useAxios from '../hooks/useAxios';
import userAxios from '../hooks/nicknameAxios';
import Menu from '../components/utils/Menu';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';

function Guestbook() {
    const navigate = useNavigate();
    const location = useLocation();
    const copyUrl = "http://localhost:3000" + location.pathname;
    const { userId } = useParams();

    const commentsInit = useAxios(`/api/comment/${userId}`);
    const nickname = userAxios(`/api/user/${userId}`);

    const [comments, setComments] = useState(commentsInit);

    // 처음 방명록 방문 시, 이미 저장된 댓글 보여주는 기능
    useEffect(() => {
        setComments(commentsInit);
    }, [commentsInit]);

    // 방명록 주소 복사 함수
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('복사 성공!');
        } catch (error) {
            alert('복사 실패!');
        }
    };

    // 전송 버튼 함수
    function onSubmit(e) {
        e.preventDefault();

        // form input 값 없이 submit 금지 
        if (commentRef.current.value.length === 0) {
            alert("인사말을 입력해주세요!");
            return false;
        }

        axios.post(`/api/comment/${userId}`,
            {
                comment: commentRef.current.value
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(res => {
                commentRef.current.value = "";
                console.log("전송 성공");
                //window.location.replace(`/${userId}`);
            })
            .catch(res => { console.log('Error!', res) });

        axios.get(`/api/comment/${userId}`).then(res => {
            setComments(res.data.body);
        })
    };

    // 최신 댓글로 정렬
    comments.sort((a, b) => {
        return (b.idx - a.idx)
    })

    const commentRef = useRef(null);


    // custom modal창 함수
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    // 방명록 배경 색상 custom
    const [color, setColor] = useState("");


    return (

        <div className={styles.guestbook}
            style={{
                background: `${color}`
            }
            }>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>MEMOME</Link>
                <Menu user={userId} />
            </header>
            <span className={styles.title}> {nickname}의 방명록</span>
            <div className={styles.container}>
                <div className={styles.contents}>
                    {comments.map(comment => (
                        <Comments comment={comment} key={comment.idx} page={userId} id={comment.idx} />
                    ))}
                </div>
                <form className={styles.inputBox} onSubmit={onSubmit}>
                    <input className={styles.input} type="text" ref={commentRef} />
                    <button className={styles.submitButton}>전송</button>
                </form>
            </div>

            {(document.cookie.length > 0) ? (
                <div className={styles.buttonPart}>
                    <button className={styles.shareButton} onClick={() => { navigate("/") }}>
                        <AiOutlineHome size="24" />
                    </button>
                    <button className={styles.shareButton} onClick={() => handleCopy(copyUrl)}>
                        <MdContentCopy size="24" />
                    </button>
                </div>
            ) : (
                <div className={styles.buttonPart}>
                    <button className={styles.shareButton} onClick={() => { navigate("/signup") }}>
                        내 방명록 만들기
                    </button>
                </div>
            )}

            {/* 커스텀 기능 해제  */}
            {/* <Custom open={modalOpen} close={closeModal} setColor={setColor} /> */}
        </div >
    )

}







export default Guestbook;