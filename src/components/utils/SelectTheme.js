import styles from "./SelectTheme.module.css";
import themeA from "../../assets/images/warm_theme.png"
import { useState } from "react";

const SelectTheme = () => {

  const [theme, setTheme] = useState("");

  const handleSelectTheme = (value) => {
    alert(`${value} 입니다`);
  }

  return (
    <>
      <p className={styles.title}>Theme</p>
      <section className={styles.select}>
        <div className={styles.content} >
          <input type="radio" name="theme" id="default" value="default"/>
          <label for="default" onClick={(e) => {handleSelectTheme("default")}}>
            기본
            <img src={themeA} className={styles.themeImg}/>
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="warm" value="warm"/>
          <label for="warm" onClick={(e) => {handleSelectTheme("warm");}}>
            따뜻한
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content}>
          <input type="radio" name="theme" id="cold" value="cold" />
          <label for="cold"  onClick={(e) => {handleSelectTheme("cold");}}>
            차가운
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
        <div className={styles.content} >
          <input type="radio" name="theme" id="ect" value="ect"/>
          <label for="ect" onClick={(e) => {handleSelectTheme("ect");}}>
            기타
            <img src={themeA} className={styles.themeImg} />
          </label>
        </div>
      </section>
    </>
  );
};

export default SelectTheme;
