import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./Menu.module.css";
import { FiMenu } from 'react-icons/fi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { TbUserOff } from 'react-icons/tb';
import { withdrawal } from './Withdrawal';

function Menu({ user }) {
    // 로그아웃 함수
    function logout(e) {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/auth/logout`,
            {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true
                }
            }
        )
            .then(res => {
                console.log(res);
                sessionStorage.clear();
                console.log("전송 성공");
                window.location.replace(`/`);
            })
            .catch(res => { console.log(res) });
    };

    // 드롭다운 메뉴
    // 참고 사이트 : https://velog.io/@minu_624/TIL-React-DropDown
    function Navbar(props) {
        return (
            <nav className={styles.navbar}>
                <ul className={styles.navbarNav}>{props.children}</ul>
            </nav>
        );
    }

    function NavItem(props) {
        const [open, setOpen] = useState(false);
        return (
            <li>
                <div className={styles.iconPosition}>
                    <Link to="" className={styles.iconButton} onClick={() => setOpen(!open)}>
                        {props.icon}
                    </Link>
                </div>
                {open && props.children}
            </li>
        );
    }

    function DropdownMenu() {

        function DropdownItem(props) {
            return (
                <div className={styles.menuItem}>
                    <span className={styles.iconButton}>{props.leftIcon}</span>
                    {props.children}
                </div>
            );
        }
        return (
            <div className={styles.dropdown}>
                <div>
                    <div className={styles.menu}>
                        <DropdownItem leftIcon={<RiLogoutCircleRLine size="24" />}>
                            <Link to="/" onClick={logout}>
                                로그아웃
                            </Link>
                        </DropdownItem>
                        <DropdownItem leftIcon={<TbUserOff size="24" />}>
                            <Link to="/" onClick={withdrawal} user={user}>
                                회원탈퇴
                            </Link>
                        </DropdownItem>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <Navbar>
            <NavItem icon={<FiMenu size="24" />}>
                <DropdownMenu />
            </NavItem>
        </Navbar>
    )
}

export default Menu;