import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Comments from "../components/utils/Comments";
import styles from "./Guestbook.module.css";
import { BsGithub } from 'react-icons/bs';
import { FaTwitter } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { ImBubble } from "react-icons/im";
import useAxios from "../hooks/getComments";
import userAxios from "../hooks/getNickname";
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/utils/Loading";
import { getCookie } from "../hooks/cookie";
import Header from "../components/utils/Header";
import { useSelector } from "react-redux";

function Guestbook() {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const user_Id = getCookie("user_id");

  const commentsInit = useAxios(
    `${process.env.REACT_APP_API_URL}/api/comment/${userId}`
  );
  
  const nickname = userAxios(
    `${process.env.REACT_APP_API_URL}/api/user/${userId}`
  );

  // 테마 데이터 가져오기
  const [theme, setTheme] = useState();

  const getTheme = async() => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`)
      .then((res) => {
        setTheme(res.data.theme)
      })
  }

  let themeData; //실제로 사용할 테마 데이터 담아두는 변수

  if (theme) { // theme이 undefined이지 않을 경우
    themeData = theme
  } else { // theme이 undefined일 않을 경우 (데이터가 아직 안불러져 왔을 때)
    themeData = {
      backgroundColor: {
        start: "#FFFFF",
        middle: "#00000",
        end: "#00000"
      },
      commentColor: {
        start: "#00000",
        end: "#FFFFF"
      }
    }
  }

  useEffect(() => {
    getTheme();
  },[]);

  const [comments, setComments] = useState(commentsInit);

  const [loading, setLoading] = useState(false);

  // 전송 버튼 함수
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // form input 값 없이 submit 금지
    if (commentRef.current.value.length === 0) {
      alert("인사말을 입력해주세요!");
      return false;
    } else {
      setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기

      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/comment/${userId}`, {
          comment: commentRef.current.value,
        })
        .then((res) => {
          commentRef.current.value = "";
          //window.location.replace(`/${userId}`);

          axios
            .get(`${process.env.REACT_APP_API_URL}/api/comment/${userId}`)
            .then((res) => {
              console.log("enter", res.data.body);
              setComments(res.data.body);
            });

          setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        })
        .catch((res) => {
          console.log("Error!", res);
        });
    }
  };

  // 날짜 오름차순으로 댓글 정렬
  if (commentsInit !== "notFound") {
    comments.sort((a, b) => {
      return new Date(a.iso_time) - new Date(b.iso_time);
    });
  }

  const commentRef = useRef(null);

  // SNS 공유 기능 (트위터)
  const shareTwitter = () => {
    var sendText = "MEMOME: 나만의 방명록"; // 전달할 텍스트
    var sendUrl = `https://memome.be/${userId}`; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    );
  };

  // SNS 공유 기능 (카카오)
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }
  }

  // url 가져오기
  const url = `https://memome.be/${userId}`;

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나만의 방명록 : MEMOME",
        description: "나만의 방명록을 만들어보고 친구들과 공유해보세요!",
        imageUrl: "https://i.ibb.co/zGKbKbx/memome-test.png",
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  // 테마색상 가져오기
  const themeColor = useSelector((state) => state.theme.themeColor);

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

  useEffect(()=>{
    const scrollToTop = document.getElementById("contents");
    //scrollToTop.scrollTop -= 150000;
    scrollToTop.scrollTop = scrollToTop.scrollHeight+500;
  },[comments]);

  //
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.axync = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return commentsInit !== "notFound" ? (
    <div
      className={styles.guestbook}
      style={{
        background: `linear-gradient(106.37deg, ${themeData.backgroundColor.start} 29.63%, ${themeData.backgroundColor.middle} 51.55%, ${themeData.backgroundColor.end} 90.85%)`,
      }}
    >
      <Header userId={userId}/>
      <span className={styles.title}> {nickname}의 방명록</span>
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={styles.alert}>
            익명으로 작성할 수 있으며, 어뷰징 방지를 위해 <br /> IP를 수집하고
            있습니다.
          </div>
          <div className={styles.alertMaximum}>
            익명으로 작성할 수 있으며, 어뷰징 방지를 위해 IP를 수집하고
            있습니다.
          </div>
        </div>
        <div className={styles.contents} id="contents">
          {comments.map((comment) => (
            <Comments
              comment={comment}
              key={comment.idx}
              page={userId}
              id={comment.idx}
              themeData={themeData}
            />
          ))}
        </div>
        <form className={styles.inputBox} onSubmit={onSubmit}>
          <input
            className={styles.input}
            type="text"
            ref={commentRef}
            maxLength="1000"
          />
          <button className={styles.submitButton}>전송</button>
        </form>
      </div>

      <Link to="/feedback" className={styles.feedback}>
        <ImBubble size="24" />
      </Link>

      {user_Id ? (
        <div className={styles.buttonPart}>
          <Link to="/readme" className={styles.shareButton}>
            <BsGithub size="24" />
          </Link>
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
          <button
            className={styles.shareButton}
            onClick={() => {
              navigate("/signup");
            }}
          >
            내 방명록 만들기
          </button>
        </div>
      )}

      {/* 커스텀 기능 해제  */}
      {/* <Custom open={modalOpen} close={closeModal} setColor={setColor} /> */}

      {/* 로딩중일 때 화면 */}
      {loading ? <Loading /> : null}
    </div>
  ) : (
    <div>
      <NotFound />
    </div>
  );
}

export default Guestbook;
