import { useState } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { TbUserOff } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import styles from "./Menu.module.css";
import { withdrawal } from './Withdrawal';

export function Navbar(props) {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarNav}>{props.children}</ul>
        </nav>
    );
}

export function NavItem(props) {
    const [open, setOpen] = useState(false);
    return (
        <li>
            <div className={styles.iconPosition}>
                <Link to="" className={styles.iconButton} onClick={(event) => {
                    event.preventDefault();  //to로 넘어가는거 방지
                    event.stopPropagation();
                    setOpen(!open);
                }}>
                    {props.icon}
                </Link>
            </div>
            {open && props.children}
        </li>
    );
}

function DropdownItem(props) {
    return (
        <div className={styles.menuItem}>
            <span className={styles.iconButton}>{props.leftIcon}</span>
            {props.children}
        </div>
    );
}

export function DropdownMenu({ user }) {

    return (
        <div className={styles.dropdown}>
            <div>
                <div className={styles.menu}>
                    <DropdownItem leftIcon={<RiLogoutCircleRLine size="24" />}>
                        <Link to="/" onClick={Logout}>
                            로그아웃
                        </Link>
                    </DropdownItem>
                    <DropdownItem leftIcon={<TbUserOff size="24" />}>
                        <Link to="" onClick={e => withdrawal(user)}>
                            회원탈퇴
                        </Link>
                    </DropdownItem>
                </div>
            </div>
        </div>
    );
}