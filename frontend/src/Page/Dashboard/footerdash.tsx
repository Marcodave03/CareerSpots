import React from 'react';

const Footerdash: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <nav>
                    <ul className="footer-menu">
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="credits">
                    © {new Date().getFullYear()} Creative Tim, made with love for a better web
                </div>
            </div>
        </footer>
    );
};

export default Footerdash;
