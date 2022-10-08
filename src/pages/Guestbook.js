import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Comments from '../components/utils/Comments';
import styles from "./Guestbook.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import useAxios from '../hooks/useAxios';
import userAxios from '../hooks/nicknameAxios';
import Menu from '../components/utils/Menu';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import NotFound from './NotFound';

function Guestbook() {
    const navigate = useNavigate();
    const location = useLocation();
    const copyUrl = "https://memome.be" + location.pathname;
    const { userId } = useParams();

    const commentsInit = useAxios(`${process.env.REACT_APP_API_URL}/api/comment/${userId}`);
    const nickname = userAxios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);

    const [comments, setComments] = useState(commentsInit);

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
    const onSubmit = async (e) => {
        e.preventDefault();

        // form input 값 없이 submit 금지 
        if (commentRef.current.value.length === 0) {
            alert("인사말을 입력해주세요!");
            return false;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/comment/${userId}`,
            {
                comment: commentRef.current.value
            }
        )
            .then(res => {
                commentRef.current.value = "";
                console.log("전송 성공");
                //window.location.replace(`/${userId}`);

                axios.get(`${process.env.REACT_APP_API_URL}/api/comment/${userId}`).then(res => {
                    console.log("enter", res.data.body)
                    setComments(res.data.body);
                })
            })
            .catch(res => { console.log('Error!', res) });
    };

    // 최신 댓글로 정렬
    comments.sort((a, b) => {
        return new Date(b.iso_time) - new Date(a.iso_time)
    })

    const commentRef = useRef(null);


    // SNS 공유 기능 (트위터)
    const shareTwitter = () => {
        var sendText = "메모미 sns 공유 텍스트 예시"; // 전달할 텍스트
        var sendUrl = "https://memome.be"; // 전달할 URL
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
    }

    // SNS 공유 기능 (카카오)
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
        }
    }

    // url 가져오기
    const url = window.location.href;
    const domain = url.substring(0, url.indexOf("/", 10));
    console.log(domain)

    const shareKakao = () => {
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '나만의 방명록 : MEMOME',
                description: '나만의 방명록을 만들어보고 친구들과 공유해보세요!',
                imageUrl: domain + '/assets/img/memome_test.png',
                link: {
                    webUrl: url,
                    mobileWebUrl: url,
                },
            },
            buttons: [
                {
                    title: '웹으로 이동',
                    link: {
                        webUrl: url,
                        mobileWebUrl: url,
                    },
                },
            ]
        })
    }

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

    // 처음 방명록 방문 시, 이미 저장된 댓글 보여주는 기능
    useEffect(() => {
        setComments(commentsInit);
    }, [commentsInit]);

    //
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.axync = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);


    return (

        (commentsInit !== "notFound") ? (
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
                        <button className={styles.shareButton} onClick={shareTwitter}>
                            {/* <MdContentCopy size="24" /> */}
                            <FaTwitter size="24" />
                        </button>
                        <button className={styles.shareButton} onClick={shareKakao}>
                            <RiKakaoTalkFill size="24" />
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
            </div >) : (
            <div>
                <NotFound />
            </div>
        )
    )

}







export default Guestbook;