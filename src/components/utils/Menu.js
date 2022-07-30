import { FiMenu } from 'react-icons/fi';
import { DropdownMenu, DropdownMenuLogin, Navbar, NavItem } from './Navigation';

function Menu({ user }) {
    return (
        <Navbar>
            <NavItem icon={<FiMenu size="24" />}>
                {(document.cookie.length > 0) ? (
                    <DropdownMenu user={user} />
                ) : (
                    <DropdownMenuLogin />
                )}
            </NavItem>
        </Navbar>
    )
}

export default Menu;