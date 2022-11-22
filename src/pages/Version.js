import styles from "./Version.module.css";

function Version () {
    return(
        <div>
            <header className={styles.header}>
            About Memome 
            </header>
            <section className={styles.container}>
            <div className={styles.main}>
                <div>
                <div className={styles.title}>Developers</div>
                <div className={styles.profileContainer}>
                    <div className={styles.profileItem}>
                        <img src="/img/profile_ksm.png" alt="" className={styles.profileImg}/>
                        <div className={styles.profileName}>김수민</div>
                        <div className={styles.profileWork}>Frontend Developer</div>
                    </div>
                    <div className={styles.profileItem}>
                        <img src="/img/profile_psm.png" alt="" className={styles.profileImg}/>
                        <div className={styles.profileName}>박성민</div>
                        <div className={styles.profileWork}>Backend Developer</div>
                    </div>
                </div>
                <hr />
                <div className={styles.versionContainer}>
                    <p className={styles.title}>Version</p>
                    <p className={styles.versionTitle}>[NEXT] v 1.1.0</p>
                    <li>테마가 추가됩니다.</li>
                    <p className={styles.versionTitle}>v 1.0.0</p>
                    <li>메모미 탄생🥳</li>
                </div>
                </div> 
                <br />
            </div>
            </section>
        </div>
    )
}

export default Version;