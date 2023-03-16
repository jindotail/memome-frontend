import styles from "./SelectTheme.module.css";
import axios from "axios";
import { getCookie } from "../../hooks/cookie";
import { token } from "../../hooks/token";
import { useDispatch } from "react-redux";
import { themeActions } from "../../store/theme";

// 테마 이미지
import themeDefault from "../../assets/images/default.png";
import themeBlue from "../../assets/images/blue.png";
import themeGreen from "../../assets/images/green.png";
import themeOrange from "../../assets/images/orange.png";

const SelectTheme = () => {
  const dispatch = useDispatch();

  let theme;

  const handleSelectTheme = (value) => {
    theme = value;
  };

  // 사용자 id 가져오기
  const user = getCookie("user_id");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`${process.env.REACT_APP_API_URL}/api/user/${user}`,
        {
          themeId: theme
        }
    )
        .then((res) => {
            alert("테마가 변경되었습니다.");
            axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user}`)
            .then((res)=>{
              const startColor = res.data.theme.backgroundColor.start;
              const middleColor = res.data.theme.backgroundColor.middle;
              const endColor = res.data.theme.backgroundColor.end;

              const startCommentColor = res.data.theme.commentColor.start;
              const endCommentColor = res.data.theme.commentColor.end;

              dispatch(themeActions.setThemeColor({
                startColor: startColor,
                middleColor: middleColor,
                endColor: endColor
              }));

              dispatch(themeActions.setCommentColor({
                startColor: startCommentColor,
                endColor: endCommentColor
              }));

            })
        })
        .catch(res => {
            const userId = { user }
            if (res.response.status === 401) {
                console.log("토큰이 만료되었습니다");
                token(userId, "테마");
            }
        });
  };

  return (
    <>
      <p className={styles.title}>테마 변경</p>
      <section className={styles.select}>
        <div className={styles.content}>
          <input type="radio" name="theme" id="default" value="default" />
          <label
            for="default"
            onClick={(e) => {
              handleSelectTheme(1);
            }}
          >
            기본
            <img src={themeDefault} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="warm" value="warm" />
          <label
            for="warm"
            onClick={(e) => {
              handleSelectTheme(2);
            }}
          >
            파랑
            <img src={themeBlue} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="cold" value="cold" />
          <label
            for="cold"
            onClick={(e) => {
              handleSelectTheme(3);
            }}
          >
            오렌지
            <img src={themeOrange} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="ect" value="ect" />
          <label
            for="ect"
            onClick={(e) => {
              handleSelectTheme(4);
            }}
          >
            초록
            <img src={themeGreen} className={styles.themeImg} />
          </label>
        </div>
      </section>
      <section className={styles.buttonPart}>
        <button className={styles.idButton} onClick={handleSubmit}>
          변경
        </button>
      </section>
    </>
  );
};

export default SelectTheme;
