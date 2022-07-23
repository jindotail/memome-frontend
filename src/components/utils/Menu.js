import { FiMenu } from 'react-icons/fi';
import { DropdownMenu, Navbar, NavItem } from './Navigation';

function Menu({ user }) {
    return (
        <Navbar>
            <NavItem icon={<FiMenu size="24" />}>
                <DropdownMenu user={user} />
            </NavItem>
        </Navbar>
    )
}

export default Menu;