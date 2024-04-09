import React, { useState } from 'react';
import { useAuth} from "../Sign/AuthContext";
import "../../style/HomePage/UserMenu.css";

const UserMenu = () => {
    const { currentUser, signOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="user-menu" onClick={handleToggleDropdown}>
            <span>{currentUser.email}</span>
            {showDropdown && (
                <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
