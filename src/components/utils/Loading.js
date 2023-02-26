import React from 'react';
import styles from "./Loading.module.css";
import Spinner from '../../assets/gif/Spinner.gif';

function Loading () {
    return (
        <div className={styles.background}>
            <img src={Spinner} alt="로딩중" width="20%" />
        </div>
    );
};

export default Loading;
