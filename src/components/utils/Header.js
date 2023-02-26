import { Link } from "react-router-dom";
import styles from './Header.module.css';
import Menu from "./Menu";

function Header({userId}) {
    return(
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                MEMOME
            </Link>
            <Menu user={userId} />
        </header>
    )
}

export default Header;