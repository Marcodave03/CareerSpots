import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="javascript:;" className="simple-text">
                      Your Logo
                    </a>
                </div>
                <ul className="nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="dashboard.html">
                            <i className="nc-icon nc-paper-2"></i>
                            <p>First example</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./user.html">
                            <i className="nc-icon nc-bell-55"></i>
                            <p>Second example</p>
                        </a>
                    </li>

                    <li className="nav-item active active-pro">
                        <a className="nav-link active" href="javascript:;">
                            <i className="nc-icon nc-alien-33"></i>
                            <p>Upgrade plan</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
