import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { RiLogoutCircleRLine, RiLoginCircleLine } from 'react-icons/ri';
import { TbUserOff } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import Main from './Main';
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
            <span className={styles.iconButton2}>{props.leftIcon}</span>
            {props.children}
        </div>
    );
}

// 로그인 했을 때 드롭다운 
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
                    <DropdownItem leftIcon={<AiOutlineHome size="24" />}>
                        <Link to="/{}">
                            내 방명록
                        </Link>
                    </DropdownItem>
                </div>
            </div>
        </div>
    );
}

// 로그인 안했을 때 드롭다운 
export function DropdownMenuLogin() {
    return (
        <div className={styles.dropdown}>
            <div>
                <div className={styles.menu}>
                    <DropdownItem leftIcon={<RiLoginCircleLine size="24" />}>
                        <Link to="/" onClick={Main}>
                            로그인
                        </Link>
                    </DropdownItem>
                </div>
            </div>
        </div>
    );
}