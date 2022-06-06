import { useState } from 'react';
import ColorPicker from './ColorPicker';
import styles from "./Custom.module.css";

function Custom(props) {
    const { open, close } = props;
    const [color1, setColor1] = useState("initial data");
    const [color2, setColor2] = useState("initial data");
    const [color3, setColor3] = useState("initial data");


    return (
        <div className={open ? `${styles.openModal} ${styles.modal}` : styles.modal} >
            {open ? (
                <section>
                    <div className={styles.title}>배경색 설정</div>
                    <div className={styles.colorPicker}>
                        <ColorPicker setData={setColor1} />
                        <ColorPicker setData={setColor2} />
                        <ColorPicker setData={setColor3} />
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.applyBtn} onClick={() => props.setColor(`linear-gradient(106.37deg, ${color1} 29.63%, ${color2} 51.55%, ${color3} 90.85%)`)} >
                            적용
                        </button>
                        <button className={styles.closeBtn} onClick={close}>닫기</button>
                    </div>


                </section>
            ) : null
            }
        </div>
    )
}

export default Custom;