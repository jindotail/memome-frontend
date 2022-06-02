import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";
import useAxios from '../hooks/useAxios';

function Guestbook({ page }) {
    const url = window.location.href;
    const comments = useAxios(`http://localhost:8080/api/comment/${page}`);

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

                alert("전송이 되었습니다.");

            })
            .catch(res => { console.log('Error!') });
    }

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