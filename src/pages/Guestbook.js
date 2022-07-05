import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import Custom from '../components/utils/Custom';
import useAxios from '../hooks/useAxios';
import userAxios from '../hooks/nicknameAxios';
import Menu from '../components/utils/Menu';
import { useParams } from 'react-router-dom';

function Guestbook({ page }) {
    const copyUrl = window.location.href;
    const comments = useAxios(`http://localhost:8080/api/comment/${page}`);
    const nickname = userAxios(`http://localhost:8080/api/user/${page}`);

    //const { userId } = useParams();
    // const [comments, setComments] = useState([])
    // console.log(userId);
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/comments/${userId}`).then(res => setComments(res.data))
    // }, [userId])

    // console.log("댓글:", comments);

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

        axios.post(`http://localhost:8080/api/comment/${page}`,
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
                window.location.replace(`/${page}`);
            })
            .catch(res => { console.log('Error!') });
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
            }}>
            <header className={styles.header}>
                {
                    (sessionStorage.length > 0) ? (
                        <Menu user={page} />
                    ) : null
                }
            </header>
            <span className={styles.title}> {nickname}의 방명록</span>
            <div className={styles.container}>
                <div className={styles.contents}>
                    {comments.map(comment => (
                        <Comments comment={comment} key={comment.idx} page={page} id={comment.idx} />
                    ))}
                </div>
                <form className={styles.inputBox} onSubmit={onSubmit}>
                    <input className={styles.input} type="text" ref={commentRef} />
                    <button className={styles.submitButton}>전송</button>
                </form>
            </div>
            <div className={styles.buttonPart}>
                <button className={styles.shareButton}>
                    <IoColorPaletteOutline size="24" onClick={openModal} />
                </button>
                <button className={styles.shareButton} onClick={() => handleCopy(copyUrl)}>
                    <MdContentCopy size="24" />
                </button>
            </div>

            <Custom open={modalOpen} close={closeModal} setColor={setColor} />
        </div >


    )
}

export default Guestbook;