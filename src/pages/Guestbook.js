import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";

function Guestbook({ page }) {
    const url = window.location.href;
    const comments = useFetch(`http://localhost:3001/comment?page=${page}`);
    const navigate = useNavigate();

    // 방명록 주소 복사 함수
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('복사 성공!');
        } catch (error) {
            alert('복사 실패!');
        }
    };

    // 현재 시간 리턴 함수
    const [currentDate, setCurrentDate] = useState('0');

    useEffect(() => {
        const date = new Date();
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate());
        const totalDate = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
        setCurrentDate(totalDate);
    }, [currentDate])

    // 전송 버튼 함수
    function onSubmit(e) {
        e.preventDefault();
        console.log(commentRef.current.value);

        fetch(`http://localhost:3001/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: commentRef.current.value,
                date: currentDate,
                page: page
            })
        }).then(res => {
            if (res.ok) {
                alert("전송이 되었습니다.");
                window.location.replace(`/${page}`)

            }
        })
    }

    // 최신 댓글로 정렬
    comments.sort((a, b) => {
        return (b.id - a.id)
    })

    const commentRef = useRef(null);

    return (
        <div className={styles.guestbook}>
            <span className={styles.title}> {page}'s Guestbook</span>
            <div className={styles.container}>
                <div className={styles.contents}>
                    {comments.map(comment => (
                        <Comments comment={comment} key={comment.id} />
                    ))}
                </div>
                <form className={styles.inputBox} onSubmit={onSubmit}>
                    <input type="text" ref={commentRef} />
                    <button className={styles.submitButton}>전송</button>
                </form>
            </div>
            <button className={styles.shareButton} onClick={() => handleCopy(url)}>방명록 공유하기</button>
        </div >

    )
}

export default Guestbook;