import styles from "./SelectTheme.module.css";
import themeA from "../../assets/images/warm_theme.png";
import { useState } from "react";

const SelectTheme = () => {
  //const [theme, setTheme] = useState("");

  let theme;

  const handleSelectTheme = (value) => {
    alert(`${value} 입니다`);
    theme = value;
    console.log(theme, "theme");
  };

  const handleSubmit = () => {
    console.log(theme, "submit");
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
              handleSelectTheme("default");
            }}
          >
            기본
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="warm" value="warm" />
          <label
            for="warm"
            onClick={(e) => {
              handleSelectTheme("warm");
            }}
          >
            따뜻한
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="cold" value="cold" />
          <label
            for="cold"
            onClick={(e) => {
              handleSelectTheme("cold");
            }}
          >
            차가운
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="ect" value="ect" />
          <label
            for="ect"
            onClick={(e) => {
              handleSelectTheme("ect");
            }}
          >
            기타
            <img src={themeA} className={styles.themeImg} />
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
