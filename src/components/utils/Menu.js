import { FiMenu } from 'react-icons/fi';
import { getCookie } from '../../hooks/cookie';
import { DropdownMenu, DropdownMenuLogin, Navbar, NavItem } from './Navigation';

function Menu({ user }) {
    
    const userId = getCookie("user_id");

    return (
        <Navbar>
            <NavItem icon={<FiMenu size="24" />}>
                {(userId) ? (
                    <DropdownMenu user={user} />
                ) : (
                    <DropdownMenuLogin />
                )}
            </NavItem>
        </Navbar>
    )
}

export default Menu;